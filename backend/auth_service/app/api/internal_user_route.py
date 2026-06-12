from fastapi import APIRouter, HTTPException
from app.schemas.user_schema import UserResponse
from app.core.database import DB_Dependencies
from app.dependencies.auth_dependency import Auth_Dependency
from starlette import status
from app.services.internal_user_service import InternalUserService
from app.utils.response import success, error
from common_service.response_schema import ApiResponse
from app.schemas.user_schema import CreateInternalUserRequest

router = APIRouter(prefix="/internal", tags=["Internal-Routes"])


# CREATE INTERNAL USER FROM PATIENT SERVICE
@router.post('/user', status_code=status.HTTP_201_CREATED, response_model=ApiResponse[UserResponse])
async def create_internal_user(db: DB_Dependencies, auth: Auth_Dependency, user_data: CreateInternalUserRequest):
    if not auth:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized Access!")

    user = InternalUserService.create_internal_user(db, user_data)
    return success("User has been created successfully", user)


# GET USER BY USER UUID
@router.get("/user/{user_uuid}", status_code=status.HTTP_200_OK, response_model=ApiResponse[UserResponse])
async def get_internal_user_by_user_uuid(db: DB_Dependencies, auth: Auth_Dependency, user_uuid: str):
    if not auth:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized access!")

    user = InternalUserService.get_internal_user_by_user_uuid(db, user_uuid)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No Role Found!")

    return success("User Found", user)