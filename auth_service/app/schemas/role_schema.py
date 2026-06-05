from pydantic import BaseModel
from typing import Optional


class CreateRoleRequest ( BaseModel ):
    name: str
    display_name: str
    description: Optional[str] = None


class AssignRoleRequest ( BaseModel ):
    user_id: int
    role_id: int
