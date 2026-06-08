from starlette import status
from app.utils.response import success
from fastapi import APIRouter, HTTPException
from app.core.database import DB_Dependencies
from app.schemas.role_schema import RoleResponse
from app.services.role_service import RoleService
from app.schemas.response_schema import ApiResponse
from app.dependencies.auth_dependency import Auth_Dependency
from app.schemas.role_schema import CreateRoleRequest, UpdateRoleRequest
from app.schemas.user_role_schema import CreateUserRoleRequest

router = APIRouter ( prefix = "/role", tags = [ "Role-Router" ] )


# GET ALL ROLE 
@router.get( "/", status_code = status.HTTP_200_OK, response_model = ApiResponse[list[RoleResponse]] )
async def get_all_roles ( db: DB_Dependencies, auth: Auth_Dependency ):
    if auth is None:
        raise HTTPException( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )
    
    roles = RoleService.get_all_roles ( db )
    if not roles:
        raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "No Roles Found!" )

    return success ( " All Roles retrieve successfully", roles )


# GET ROLE BY ROLE UUID
@router.get( "/{role_uuid}", status_code = status.HTTP_200_OK, response_model = ApiResponse[RoleResponse] )
async def get_role_by_role_uuid ( db: DB_Dependencies, auth: Auth_Dependency, role_uuid: str ):
    if not auth:
        raise HTTPException( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )
    
    role = RoleService.get_role_by_role_uuid ( db, role_uuid )
    if not role:
        raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "No Role Found!" )
    
    return success("Role Found", role)


# CREATE ROLE
@router.post ( "/", status_code = status.HTTP_201_CREATED, response_model = ApiResponse[RoleResponse] )
async def create_role ( db: DB_Dependencies, auth: Auth_Dependency, role_req: CreateRoleRequest ):
    if auth is None:
        raise HTTPException( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )
    
    role = RoleService.create_role ( db, role_req )
    return success ( "Role has been created successfully", role )


# UPDATE ROLE
@router.put( "/{role_uuid}", status_code = status.HTTP_202_ACCEPTED, response_model = ApiResponse[RoleResponse] )
async def update_role ( db: DB_Dependencies, auth: Auth_Dependency, role_req: UpdateRoleRequest, role_uuid: str ):
    if not auth:
        raise HTTPException( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )
    
    role = RoleService.update_role ( db, role_uuid, role_req )
    return success ( "Role has been updated successfully", role )


# DELETE ROLE
@router.delete( "/{role_uuid}", status_code = status.HTTP_204_NO_CONTENT )
async def delete_role ( db: DB_Dependencies, auth: Auth_Dependency, role_uuid: str ):
    if not auth:
        raise HTTPException( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )
    
    role = RoleService.delete_role ( db, role_uuid )
    return success ( "Role has been deleted successfully", role )


# ASSIGN ROLE TO USER
@router.post ( "/assign", status_code = status.HTTP_201_CREATED )
async def create_role ( db: DB_Dependencies, auth: Auth_Dependency, assign_req: CreateUserRoleRequest ):
    if auth is None:
        raise HTTPException( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )
    
    role = RoleService.assign_role_to_user ( db, assign_req )
    return success ( "Role has been assign successfully to User", role )
