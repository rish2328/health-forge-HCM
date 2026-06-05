from pydantic import BaseModel
from typing import Optional


class CreatePermissionRequest ( BaseModel ):
    name: str
    display_name: str
    group_name: str
    description: Optional[str] = None


class AssignPermissionRequest ( BaseModel ):
    role_id: int
    permission_id: int