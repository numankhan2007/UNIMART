import os
import logging
from fastapi import Request, HTTPException
import redis.asyncio as aioredis

logger = logging.getLogger(__name__)
_redis_client = None
_redis_warned = False  # Track if we've already warned about Redis being unavailable


def _get_redis():
    global _redis_client
    if _redis_client is None:
        _redis_client = aioredis.from_url(os.getenv("REDIS_URL", "redis://localhost:6379"))
    return _redis_client


def get_request_ip(request: Request) -> str:
    forwarded = request.headers.get("X-Forwarded-For", "")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


async def rate_limit(
    request: Request,
    limit: int = 60,
    window: int = 60,
    fail_open: bool = True,
):
    """Atomic sliding window rate limiter using Redis pipeline."""
    client = _get_redis()
    ip = get_request_ip(request)
    key = f"rl:{request.url.path}:{ip}"
    try:
        async with client.pipeline(transaction=True) as pipe:
            await pipe.incr(key)
            await pipe.expire(key, window, nx=True)
            results = await pipe.execute()
        count = results[0]
        if count > limit:
            raise HTTPException(429, f"Rate limit exceeded. Try again in {window}s.")
    except HTTPException:
        raise
    except Exception as e:
        if not fail_open:
            logger.error("Rate limiting unavailable (strict): %s", type(e).__name__)
            raise HTTPException(503, "Rate limiter unavailable.")
        global _redis_warned
        if not _redis_warned:
            logger.warning("Rate limiting unavailable (fail-open): %s", type(e).__name__)
            _redis_warned = True


def rate_limit_strict(limit: int = 10, window: int = 60):
    async def dependency(request: Request):
        await rate_limit(request, limit, window)
    return dependency


def rate_limit_normal(limit: int = 60, window: int = 60):
    async def dependency(request: Request):
        await rate_limit(request, limit, window)
    return dependency


def rate_limit_relaxed(limit: int = 200, window: int = 60):
    async def dependency(request: Request):
        await rate_limit(request, limit, window)
    return dependency
