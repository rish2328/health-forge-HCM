from pydantic import BaseModel
from typing import Optional
from uuid import UUID


class CreateRoleRequest ( BaseModel ):
    name: str
    display_name: str
    description: Optional[str] = None


class UpdateRoleRequest ( BaseModel ):
    name: str
    display_name: str
    description: Optional[str] = None


class AssignRoleRequest ( BaseModel ):
    user_id: int
    role_id: int


class RoleResponse ( BaseModel ):
    id: int
    uuid: UUID
    name: str
    display_name: str
    description: str | None = None
