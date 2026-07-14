from fastapi import APIRouter, HTTPException
from starlette import status
from app.core.database import DB_Dependencies
from common_service.response_schema import ApiResponse
from app.schemas.department_schema import DepartmentResponse, CreateDepartmentRequest, UpdateDepartmentRequest
from app.dependencies.auth_dependency import Auth_Dependency
from app.services.department_service import DepartmentService
from app.utils.response import success

router = APIRouter ( prefix = "/department", tags = [ "Department Routes" ] )

# GET ALL DEPARTMENTS
@router.get ( "/", status_code = status.HTTP_200_OK, response_model = ApiResponse[list[DepartmentResponse]] )
async def get_all_departments ( db: DB_Dependencies, auth: Auth_Dependency ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    departments = DepartmentService.get_all_departments( db )
    return success ( "Retrieve all Departments successfully!", departments )


# GET DEPARTMENT BY DEPARTMENT UUID
@router.get ( "/{department_uuid}", status_code = status.HTTP_200_OK, response_model = ApiResponse[DepartmentResponse] )
async def get_department_by_department_uuid ( db: DB_Dependencies, auth: Auth_Dependency, department_uuid: str ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    department = DepartmentService.get_department_by_department_uuid( db, department_uuid )
    return success ( "Retrieve Department by ID successfully!", department )


# CREATE DEPARTMENT
@router.post( '/', status_code = status.HTTP_201_CREATED, response_model=ApiResponse[DepartmentResponse] )
async def create_department ( db: DB_Dependencies, auth: Auth_Dependency, department_data: CreateDepartmentRequest ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    department = DepartmentService.create_department( db, department_data )
    return success( "Department has been created successfully", department )


# DELETE DEPARTMENT
@router.delete( '/{department_uuid}', status_code = status.HTTP_200_OK )
async def delete_department ( db: DB_Dependencies, auth: Auth_Dependency, department_uuid: str ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    patient = DepartmentService.delete_department( db, department_uuid )
    return success( "Department has been deleted successfully", patient )


# UPDATE DEPARTMENT
@router.put( '/{department_uuid}', status_code = status.HTTP_200_OK, response_model=ApiResponse[DepartmentResponse] )
async def update_department ( db: DB_Dependencies, auth: Auth_Dependency, department_uuid: str, department_data: UpdateDepartmentRequest ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    department = DepartmentService.update_department( db, department_uuid, department_data )
    return success("Department has been updated successfully", department)