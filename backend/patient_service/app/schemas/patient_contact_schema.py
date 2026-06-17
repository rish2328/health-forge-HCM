from pydantic import BaseModel
from typing import Optional


class CreatePatientContactRequest ( BaseModel ):
    patient_uuid: str
    name: str
    relation: str
    phone: str
    email: Optional[str] = None
    is_emergency_contact: bool


class UpdatePatientContactRequest ( BaseModel ):
    patient_uuid: str
    name: str
    relation: str
    phone: str
    email: Optional[str] = None
    is_emergency_contact: bool


class PatientContactResponse ( BaseModel ):
    id: int
    name: str
    relation: str
    phone: str
    email: Optional[str] = None
    is_emergency_contact: bool

    class Config:
        from_attributes = True