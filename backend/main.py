from fastapi import FastAPI, Request, Depends
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware
import redis
import os
import logging
from contextlib import asynccontextmanager
from sqlalchemy.orm import Session
from database import engine, Base, get_db
from models import UserProfile
from routers import auth, products, orders, chat, otp, admin, upload, notifications
from scheduler import start_scheduler, stop_scheduler
from seed_data import seed_official_records
from admin_auth import seed_super_admin
from admin_models import AdminAccount, AdminAuditLog
from settings import is_production, is_placeholder
from middleware.rate_limit import rate_limit_relaxed


logging.basicConfig(
    level=os.getenv("LOG_LEVEL", "INFO").upper(),
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
)
logger = logging.getLogger("unimart.api")


# ============================================================
# APP LIFESPAN (Startup & Shutdown)
# ============================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    # STARTUP: scheduler should run in exactly one process.
    scheduler_enabled = os.getenv("ENABLE_SCHEDULER", "false").lower() == "true"
    if scheduler_enabled:
        start_scheduler()
        logger.info("Scheduler enabled for this process")
    
    # Auto-seed official records if empty
    try:
        seed_official_records()
        logger.info("Database seeding check completed")
    except Exception as e:
        logger.exception("Error during auto-seeding")

    # Seed super admin account
    try:
        from database import SessionLocal
        db = SessionLocal()
        try:
            seed_super_admin(db)
        finally:
            db.close()
        logger.info("Admin account check completed")
    except Exception as e:
        logger.exception("Admin seeding failed")
        
    logger.info("Unimart API is ready")
    if not is_production():
        _weak_vars = []
        for var in ["SECRET_KEY", "REFRESH_TOKEN_SECRET", "ADMIN_JWT_SECRET", "OTP_HMAC_KEY"]:
            val = os.getenv(var, "")
            if is_placeholder(val) or len(val) < 16:
                _weak_vars.append(var)
        if _weak_vars:
            logger.warning(
                "WEAK/MISSING SECRETS DETECTED (dev mode only): %s - Set strong values before production.",
                ", ".join(_weak_vars),
            )
    yield
    # SHUTDOWN: Stop scheduler
    if scheduler_enabled:
        stop_scheduler()


# ============================================================
# APP INITIALIZATION
# ============================================================

app = FastAPI(
    title="Unimart API",
    description="Secure Student-to-Student Marketplace Backend",
    version="1.0.0",
    lifespan=lifespan,
)

# ============================================================
# CORS MIDDLEWARE (Environment-based origins)
# ============================================================

# Default development origins
DEFAULT_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# Get additional origins from environment variable (comma-separated)
EXTRA_ORIGINS = os.getenv("CORS_ORIGINS", "").split(",")
EXTRA_ORIGINS = [origin.strip() for origin in EXTRA_ORIGINS if origin.strip()]

# Combine origins
if is_production():
    ALLOWED_ORIGINS = EXTRA_ORIGINS
    if not ALLOWED_ORIGINS:
        raise RuntimeError("CORS_ORIGINS must be set in production environment.")
else:
    ALLOWED_ORIGINS = DEFAULT_ORIGINS + EXTRA_ORIGINS

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "Accept", "X-Requested-With"],
    expose_headers=["Content-Length"],
    max_age=600,
)


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
        if is_production():
            response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        return response


app.add_middleware(SecurityHeadersMiddleware)

TRUSTED_HOSTS = os.getenv("TRUSTED_HOSTS", "").split(",")
TRUSTED_HOSTS = [host.strip() for host in TRUSTED_HOSTS if host.strip()]
if is_production() and TRUSTED_HOSTS:
    app.add_middleware(TrustedHostMiddleware, allowed_hosts=TRUSTED_HOSTS)

# ============================================================
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi.responses import JSONResponse

# EXCEPTION HANDLERS (To preserve CORS on unhandled exceptions)
# ============================================================

def add_cors_headers(response: JSONResponse, request: Request) -> JSONResponse:
    origin = request.headers.get("origin")
    if origin in ALLOWED_ORIGINS:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

@app.exception_handler(redis.RedisError)
async def redis_exception_handler(request: Request, exc: redis.RedisError):
    logger.exception("Redis exception caught")
    return add_cors_headers(
        JSONResponse(
            status_code=500,
            content={"detail": "Cache/Database connection failed. Please try again later."},
        ),
        request
    )

@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return add_cors_headers(
        JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.detail},
            headers=getattr(exc, "headers", None)
        ),
        request
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = exc.errors()
    # Extract friendly messages (e.g., "username: Value error...")
    messages = []
    for err in errors:
        field = str(err.get("loc", [""])[-1])
        msg = str(err.get("msg", "")).replace("Value error, ", "")
        messages.append(f"{field}: {msg}")
        
    return add_cors_headers(
        JSONResponse(
            status_code=422,
            content={"detail": " | ".join(messages)},
        ),
        request
    )

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    import traceback
    with open("error.log", "w") as f:
        f.write(traceback.format_exc())
    logger.exception("Unhandled exception caught")
    return add_cors_headers(
        JSONResponse(
            status_code=500,
            content={"detail": "Internal Server Error. Please contact support."},
        ),
        request
    )

# ============================================================
# REGISTER ALL ROUTERS (under /api prefix)
# ============================================================

app.include_router(auth.router, prefix="/api")
app.include_router(products.router, prefix="/api")
app.include_router(orders.router, prefix="/api")
app.include_router(chat.router, prefix="/api")
app.include_router(otp.router, prefix="/api")
app.include_router(admin.router, prefix="/api")
app.include_router(upload.router, prefix="/api")
app.include_router(notifications.router, prefix="/api")


# ============================================================
# ROOT ENDPOINTS
# ============================================================

@app.get("/")
def root():
    return {
        "app": "Unimart API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
    }


@app.get("/api/health")
def health_check():
    return {"status": "healthy"}

@app.get("/api/stats", dependencies=[Depends(rate_limit_relaxed(30, 60))])
def get_stats(db: Session = Depends(get_db)):
    student_count = db.query(UserProfile).count()
    return {"registeredStudents": student_count}
