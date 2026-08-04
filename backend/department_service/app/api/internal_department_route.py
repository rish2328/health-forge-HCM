from fastapi import APIRouter, HTTPException
from starlette import status
from common_service.response_schema import ApiResponse
from app.schemas.department_schema import DepartmentResponse
from app.core.database import DB_Dependencies
from app.dependencies.auth_dependency import Auth_Dependency
from app.services.internal_department_service import InternalDepartmentService
from app.utils.response import success


router = APIRouter( prefix = "/internal/department", tags = [ "Department Routes" ])

@router.get ( '/{department_uuid}', status_code = status.HTTP_200_OK, response_model = ApiResponse[DepartmentResponse] )
async def get_internal_department_by_department_uuid ( db: DB_Dependencies, auth: Auth_Dependency, department_uuid: str ):
    if not auth:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized access!")

    department = InternalDepartmentService.get_internal_department_by_department_uuid( db, department_uuid )
    return success ( "Retrieve Department by ID successfully!", department )

