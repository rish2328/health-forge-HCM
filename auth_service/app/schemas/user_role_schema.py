from pydantic import BaseModel
from uuid import UUID
from app.schemas.role_schema import RoleResponse


class CreateUserRoleRequest ( BaseModel ):
    user_uuid: str
    role_uuid: str


class UserRoleResponse(BaseModel):
    role: RoleResponse

    class Config:
        from_attributes = True