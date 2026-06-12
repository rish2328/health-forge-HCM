from pydantic import BaseModel
from typing import Optional


class CreatePatientContact ( BaseModel ):
    patient_id: int
    name: str
    relation: str
    phone: str
    email: Optional[str] = None
    is_emergency_contact: bool


class UpdatePatientContact ( BaseModel ):
    patient_id: int
    name: str
    relation: str
    phone: str
    email: Optional[str] = None
    is_emergency_contact: bool


class PatientContactResponse ( BaseModel ):
    name: str
    relation: str
    phone: str
    email: Optional[str] = None
    is_emergency_contact: bool

    class Config:
        from_attributes = True