from pydantic import BaseModel
from typing import Optional


class CreatePatientGuardianRequest ( BaseModel ):
    patient_id: int
    name: str
    relation: str
    phone: str
    email: Optional[str] = None
    address: str


class UpdatePatientGuardianRequest ( BaseModel ):
    patient_id: int
    name: str
    relation: str
    phone: str
    email: Optional[str] = None
    address: str


class PatientGuardianResponse ( BaseModel ):
    name: str
    relation: str
    phone: str
    email: Optional[str] = None
    address: str

    class Config:
        from_attributes = True