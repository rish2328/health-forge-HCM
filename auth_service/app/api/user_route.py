from fastapi import APIRouter
from app.schemas.user_schema import UserResponse
from app.core.database import DB_Dependencies
from app.dependencies.auth_dependency import Auth_Dependency
from starlette import status
from app.services.user_service import UserService
from app.utils.response import success, error
from app.schemas.response_schema import ApiResponse

router = APIRouter ( prefix = "/user", tags = [ "User-Routes" ] )


# GET ALL USERS 
@router.get( "/", status_code = status.HTTP_200_OK, response_model = ApiResponse[list[UserResponse]] )
async def get_all_users ( db: DB_Dependencies, auth: Auth_Dependency ):
    if auth is None:
        raise HTTPException( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )
    
    users = UserService.get_all_users ( db )
    if not users:
        raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "No Roles Found!" )

    return success ( " All Users retrieve successfully", users )


# GET ROLE BY ROLE UUID
@router.get( "/{user_uuid}", status_code = status.HTTP_200_OK, response_model = ApiResponse[UserResponse] )
async def get_user_by_user_uuid ( db: DB_Dependencies, auth: Auth_Dependency, user_uuid: str ):
    if not auth:
        raise HTTPException( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )
    
    user = UserService.get_user_by_user_uuid ( db, user_uuid )
    if not user:
        raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "No Role Found!" )
    
    return success("User Found", user)