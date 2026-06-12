from pydantic import BaseModel
from typing import Optional
from uuid import UUID


class CreatePermissionRequest ( BaseModel ):
    name: str
    display_name: str
    group_name: str
    description: Optional[str] = None


class UpdatePermissionRequest ( BaseModel ):
    name: str
    display_name: str
    group_name: str
    description: Optional[str] = None


class AssignPermissionRequest ( BaseModel ):
    role_id: int
    permission_id: int


class PermissionResponse ( BaseModel ):
    id: int
    uuid: UUID
    name: str
    display_name: str
    group_name: str
    description: str | None = None

    class Config:
        from_attributes = True