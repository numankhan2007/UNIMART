from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional, List
from datetime import datetime
import re

ALLOWED_IMAGE_HOSTS = {"res.cloudinary.com", "images.cloudinary.com"}


# ============================================================
# AUTH SCHEMAS
# ============================================================

class RegisterNumberVerify(BaseModel):
    register_number: str


class UserSignup(BaseModel):
    register_number: str
    username: str
    password: str
    personal_mail_id: EmailStr
    phone_number: Optional[str] = None

    @field_validator("username")
    @classmethod
    def validate_username(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 3:
            raise ValueError("Username must be at least 3 characters")
        if len(v) > 30:
            raise ValueError("Username must be 30 characters or less")
        if not re.match(r"^[a-zA-Z0-9_.-]+$", v):
            raise ValueError("Username may only contain letters, digits, _, -, .")
        return v


class UserLogin(BaseModel):
    studentId: str  # Accepts register_number OR username (matches frontend field name)
    password: str


class UserUpdate(BaseModel):
    username: Optional[str] = None
    profile_picture_url: Optional[str] = None
    personal_mail_id: Optional[EmailStr] = None
    phone_number: Optional[str] = None

    @field_validator("profile_picture_url")
    @classmethod
    def validate_image_url(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        from urllib.parse import urlparse
        parsed = urlparse(v)
        if parsed.scheme not in ("https",):
            raise ValueError("profile_picture_url must use HTTPS")
        if parsed.netloc not in ALLOWED_IMAGE_HOSTS:
            raise ValueError(
                f"profile_picture_url must be from an allowed host: {ALLOWED_IMAGE_HOSTS}"
            )
        return v


class TokenResponse(BaseModel):
    token: str
    refresh_token: Optional[str] = None
    user: dict


# ============================================================
# OFFICIAL RECORD RESPONSE
# ============================================================

class OfficialRecordResponse(BaseModel):
    register_number: str
    full_name: str
    university: str
    college: str
    department: str
    official_email: str

    class Config:
        from_attributes = True


# ============================================================
# USER PROFILE RESPONSE
# ============================================================

class UserProfileResponse(BaseModel):
    register_number: str
    username: str
    profile_picture_url: Optional[str] = None
    personal_mail_id: str
    phone_number: Optional[str] = None
    username_change_count: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class UserDashboardResponse(BaseModel):
    """Combined response from OfficialRecord JOIN UserProfile"""
    register_number: str
    username: str
    full_name: str
    university: str
    college: str
    department: str
    official_email: str
    profile_picture_url: Optional[str] = None
    personal_mail_id: str
    phone_number: Optional[str] = None
    username_change_count: int
    created_at: Optional[datetime] = None


# ============================================================
# PRODUCT SCHEMAS
# ============================================================

class ProductCreate(BaseModel):
    title: str
    description: Optional[str] = None
    price: float
    category: Optional[str] = None
    image_url: Optional[str] = None  # Single image (backward compat)
    image_urls: Optional[List[str]] = None  # Multiple images

    @field_validator("title")
    @classmethod
    def validate_title(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Title cannot be empty")
        if len(v) > 120:
            raise ValueError("Title must be 120 characters or less")
        return v

    @field_validator("description")
    @classmethod
    def validate_description(cls, v: Optional[str]) -> Optional[str]:
        if v and len(v) > 2000:
            raise ValueError("Description must be 2000 characters or less")
        return v


class ProductUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    image_urls: Optional[List[str]] = None


class ProductResponse(BaseModel):
    id: int
    seller_register_number: str
    title: str
    description: Optional[str] = None
    price: float
    category: Optional[str] = None
    image_url: Optional[str] = None
    image_urls: Optional[List[str]] = None
    product_status: str
    created_at: Optional[datetime] = None
    seller_username: Optional[str] = None
    seller_college: Optional[str] = None
    seller_department: Optional[str] = None

    class Config:
        from_attributes = True


# ============================================================
# ORDER SCHEMAS
# ============================================================

class OrderCreate(BaseModel):
    product_id: int


class OrderStatusUpdate(BaseModel):
    status: str


class OrderResponse(BaseModel):
    id: int
    product_id: int
    buyer_register_number: str
    seller_register_number: str
    order_status: str
    created_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    product_title: Optional[str] = None
    product_price: Optional[float] = None
    buyer_username: Optional[str] = None
    seller_username: Optional[str] = None

    class Config:
        from_attributes = True


# ============================================================
# CHAT SCHEMAS
# ============================================================

class ChatMessageCreate(BaseModel):
    message: str

    @field_validator('message')
    @classmethod
    def validate_message(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError('Message cannot be empty')
        if len(v) > 2000:
            raise ValueError('Message must be 2000 characters or less')
        return v


class ChatMessageResponse(BaseModel):
    id: int
    order_id: int
    sender_register_number: str
    message: str
    sent_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ============================================================
# OTP SCHEMAS
# ============================================================

class OTPGenerate(BaseModel):
    orderId: int


class OTPVerify(BaseModel):
    orderId: int
    otp: str


class OTPSendEmail(BaseModel):
    orderId: int
    email: Optional[str] = None  # if not provided, buyer's email is looked up from the order
