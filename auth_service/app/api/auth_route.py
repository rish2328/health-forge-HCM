from fastapi import APIRouter
from app.schemas.user_schema import RegisterRequest, LoginRequest, TokenResponse
from app.core.database import DB_Dependencies
from starlette import status
from app.services.auth_service import AuthService
from app.utils.response import success, error

router = APIRouter ( prefix = "/auth", tags = [ "Auth-Router" ] )


# REGISTER USER
@router.post ( "/register", status_code = status.HTTP_201_CREATED )
async def auth_register ( db: DB_Dependencies, auth_req: RegisterRequest ):
    auth = AuthService.auth_register_service ( db, auth_req )
    return success ( "User has been created successfully", auth )


# LOGIN USER
@router.post ( "/login", status_code = status.HTTP_201_CREATED )
async def auth_login ( db: DB_Dependencies, auth_req: LoginRequest ):
    token = AuthService.auth_login_request ( db, auth_req.email, auth_req.password )
    return success ( "User logged in successfully", { "access_token": token, "token_type": "Bearer"} )

