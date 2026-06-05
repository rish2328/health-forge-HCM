from pydantic import BaseModel, EmailStr
from typing import Optional


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