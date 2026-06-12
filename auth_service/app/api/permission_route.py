from fastapi import APIRouter, HTTPException
from starlette import status
from app.core.database import DB_Dependencies
from app.schemas.permission_schema import CreatePermissionRequest, UpdatePermissionRequest, PermissionResponse
from common_service.response_schema import ApiResponse
from app.dependencies.auth_dependency import Auth_Dependency
from app.services.permission_service import PermissionService
from app.utils.response import success


router = APIRouter ( prefix = "/permission", tags = [ "Permission-Routes" ] )


# GET ALL PERMISSIONS
@router.get( "/", status_code = status.HTTP_200_OK, response_model=ApiResponse[list[PermissionResponse]] )
async def get_all_permissions ( db: DB_Dependencies, auth: Auth_Dependency):
    if not auth:
        raise HTTPException( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    permission = PermissionService.get_all_permissions( db )
    if not permission:
        raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "No Permissions Found!" )

    return success ( "All Permissions Retrieve successfully", permission )


# GET PERMISSION BY PERMISSION UUID
@router.get( "/{permission_uuid}", status_code = status.HTTP_200_OK, response_model=ApiResponse[PermissionResponse] )
async def get_permission_by_permission_uuid ( db: DB_Dependencies, auth: Auth_Dependency, permission_uuid: str):
    if not auth:
        raise HTTPException( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    permission = PermissionService.get_permission_by_permission_uuid( db, permission_uuid )
    if not permission:
        raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "No Permissions Found!" )

    return success ( "Permission Found", permission )


# CREATE PERMISSION
@router.post( '/', status_code = status.HTTP_201_CREATED, response_model=ApiResponse[PermissionResponse] )
async def create_permission ( db: DB_Dependencies, auth: Auth_Dependency, permission_data: CreatePermissionRequest ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized Access!" )

    permission = PermissionService.create_permission ( db, permission_data )
    return success( "Permission has been created successfully", permission )


# UPDATE PERMISSION
@router.put("/{permission_uuid}", status_code = status.HTTP_202_ACCEPTED, response_model = ApiResponse[PermissionResponse])
async def update_permission(db: DB_Dependencies, auth: Auth_Dependency, permission_data: UpdatePermissionRequest, permission_uuid: str):
    if not auth:
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!")

    permission = PermissionService.update_permission ( db, permission_uuid, permission_data )
    return success("Permission has been updated successfully", permission)


# DELETE PERMISSION
@router.delete("/{permission_uuid}", status_code = status.HTTP_200_OK)
async def delete_permission(db: DB_Dependencies, auth: Auth_Dependency, permission_uuid: str):
    if not auth:
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!")

    role = PermissionService.delete_permission ( db, permission_uuid )
    return success("Permission has been deleted successfully", role)


