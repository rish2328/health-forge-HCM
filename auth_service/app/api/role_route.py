from fastapi import APIRouter
from app.schemas.role_schema import CreateRoleRequest
from app.core.database import DB_Dependencies
from starlette import status
from app.services.role_service import RoleService
from app.utils.response import success, error

router = APIRouter ( prefix = "/role", tags = [ "Auth-Router" ] )


@router.post ( "/", status_code = status.HTTP_201_CREATED )
async def create_role ( db: DB_Dependencies, role_req: CreateRoleRequest ):
    role = RoleService.create_role ( db, role_req )
    return success ( "Role has been created successfully", role )

