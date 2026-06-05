from datetime import datetime, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
from app.core.config import settings
from fastapi import HTTPException
from starlette import status


pwd_context = CryptContext( schemes = ["bcrypt"], deprecated = "auto" )


def hash_password ( password: str ) -> str:
    return pwd_context.hash(password)


def verify_password ( plainPassword: str, hashed_password: str ) -> bool:
    return pwd_context.verify( plainPassword, hashed_password )


def create_access_token ( data: dict ):
    payload = data.copy()
    iat = datetime.utcnow()
    expire = datetime.utcnow() + timedelta( minutes = settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES )
    payload.update({
        "exp": expire,
        "iat": iat
    })
    return jwt.encode( payload, settings.JWT_SECRET_KEY, algorithm = settings.JWT_ALGORITHM )


def verify_access_token ( token: str ):
    try:
        payload = jwt.decode( token, settings.JWT_SECRET_KEY, algorithms = [ settings.JWT_ALGORITHM ] )
        return payload
    except JWTError:
        raise HTTPException( status_code = status.HTTP_401_UNAUTHORIZED )
 
