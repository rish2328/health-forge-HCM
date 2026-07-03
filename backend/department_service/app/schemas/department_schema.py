from uuid import UUID
from typing import Optional
from pydantic import BaseModel


class CreateDepartmentRequest ( BaseModel ):
    name: str
    description: Optional[str] = None
    code_id: str


class UpdateDepartmentRequest ( BaseModel ):
    name: str
    description: Optional[str] = None
    code_id: str


class DepartmentResponse ( BaseModel ):
    id: int
    uuid: UUID
    name: str
    description: str | None = None
    code_id: str

    class Config:
        from_attributes = True
