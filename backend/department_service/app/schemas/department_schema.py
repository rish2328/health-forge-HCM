from uuid import UUID
from typing import Optional
from pydantic import BaseModel


class CreateDepartmentRequest ( BaseModel ):
    name: str
    code: str
    description: Optional[str] = None


class UpdateDepartmentRequest ( BaseModel ):
    name: str
    code: str
    description: Optional[str] = None


class DepartmentResponse ( BaseModel ):
    id: int
    uuid: UUID
    name: str
    code: str
    description: str | None = None
    status: bool

    class Config:
        from_attributes = True
