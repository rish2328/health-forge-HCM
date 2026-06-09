from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from uuid import UUID


class RegisterRequest ( BaseModel ):
    first_name: str
    middle_name: Optional[str] = None
    last_name: str
    email: EmailStr
    password: str
    phone: Optional[str] = None


class LoginRequest ( BaseModel ):
    email: EmailStr
    password: str


class TokenResponse ( BaseModel ):
    access_token: str
    token_type: str


class UserResponse ( BaseModel ):
    id: int
    uuid: UUID
    first_name: str
    middle_name: str | None = None
    last_name: str
    email: str
    phone: str | None = None
    last_login: datetime | None = None
    is_active: int

    class Config:
        from_attributes = True
