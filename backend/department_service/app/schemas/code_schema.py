from typing import Optional
from pydantic import BaseModel


class CreateDepartmentCodeRequest ( BaseModel ):
    name: str
    short_name: str


class UpdateDepartmentCodeRequest ( BaseModel ):
    name: str
    short_name: str


class DepartmentCodeResponse ( BaseModel ):
    id: int
    name: str
    short_name: str

    class Config:
        from_attributes = True
