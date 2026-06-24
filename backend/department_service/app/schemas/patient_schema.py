from uuid import UUID
from datetime import date
from typing import Optional
from pydantic import BaseModel
from app.schemas.patient_address_schema import PatientAddressResponse
from app.schemas.patient_contact_schema import PatientContactResponse
from app.schemas.patient_insurance_schema import PatientInsuranceResponse


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
    photo: Optional[str] = None


class UpdatePatientRequest ( BaseModel ):
    first_name: str
    middle_name: Optional[str] = None
    last_name: str
    gender: str
    dob: date
    blood_group: Optional[str] = None
    marital_status: str
    email: str
    phone: str
    photo: Optional[str] = None


class PatientResponse ( BaseModel ):
    id: int
    uuid: UUID
    auth_user_uuid: UUID
    first_name: str
    middle_name: str | None = None
    last_name: str
    gender: str
    dob: date
    blood_group: str | None = None
    marital_status: str
    email: str
    phone: str
    photo: str | None = None

    addresses: list[PatientAddressResponse] = []
    contact: list[PatientContactResponse] = []
    # document: list[PatientDocumentResponse] = []
    # guardians: list[PatientGuardianResponse] = []
    insurances: list[PatientInsuranceResponse] = []
    # notes: list[PatientNoteResponse] = []

    class Config:
        from_attributes = True
