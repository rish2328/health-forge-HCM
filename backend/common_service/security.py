from datetime import datetime, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
from common_service.config import commonSettings
from fastapi import HTTPException
from starlette import status
from fastapi.security import OAuth2PasswordBearer


pwd_context = CryptContext( schemes = ["bcrypt"], deprecated = "auto" )
oauth2Bearer = OAuth2PasswordBearer( tokenUrl = commonSettings.JWT_TOKEN_URL)

def create_access_token ( data: dict ):
    payload = data.copy()
    iat = datetime.utcnow()
    expire = datetime.utcnow() + timedelta( minutes = commonSettings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES )
    payload.update({
        "exp": expire,
        "iat": iat
    })
    return jwt.encode( payload, commonSettings.JWT_SECRET_KEY, algorithm = commonSettings.JWT_ALGORITHM )


def verify_access_token ( token: str ):
    try:
        payload = jwt.decode( token, commonSettings.JWT_SECRET_KEY, algorithms = [ commonSettings.JWT_ALGORITHM ] )
        return payload
    except JWTError:
        raise HTTPException( status_code = status.HTTP_401_UNAUTHORIZED )
 
