from uuid import UUID
from datetime import date
from typing import Optional
from pydantic import BaseModel


class CreatePatientRequest ( BaseModel ):
    first_name: str
    middle_name: Optional[str] = None
    last_name: str
    gender: str
    dob: date
    blood_group: Optional[str] = None
    marital_status: str
    email: str
    phone: str
    emergency_contact_name: str
    emergency_contact_phone: str
    photo: Optional[str] = None


class PatientResponse ( BaseModel ):
    id: int
    uuid: UUID
    first_name: str
    middle_name: str | None = None
    last_name: str
    gender: str
    dob: date
    blood_group: str | None = None
    marital_status: str
    email: str
    phone: str
    emergency_contact_name: str
    emergency_contact_phone: str
    photo: str | None = None
