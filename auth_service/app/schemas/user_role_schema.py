from pydantic import BaseModel
from uuid import UUID


class CreateUserRoleRequest ( BaseModel ):
    user_uuid: str
    role_uuid: str
