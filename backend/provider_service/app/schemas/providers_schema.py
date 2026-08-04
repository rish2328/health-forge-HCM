from uuid import UUID
from datetime import date
from typing import Optional
from decimal import Decimal
from pydantic import BaseModel


class CreateProviderSchema ( BaseModel ):
    title: str
    first_name: str
    middle_name: str
    last_name: str
    gender: str
    dob: date
    email: str
    phone: str
    department_uuid: str
    designation: str
    employment_type: str
    consultation_fee: Decimal
    followup_fee: Decimal
    emergency_fee: Decimal
    license_number: str
    registration_number: str
    remarks: Optional[str] = None
    role_name: str


class UpdateProviderSchema ( BaseModel ):
    title: str
    first_name: str
    middle_name: str
    last_name: str
    gender: str
    dob: date
    email: str
    phone: str
    department_uuid: str
    designation: str
    employment_type: str
    consultation_fee: Decimal
    followup_fee: Decimal
    emergency_fee: Decimal
    license_number: str
    registration_number: str
    remarks: Optional[str] = None
    role_name: str


class ProviderResponse ( BaseModel ):
    id: int
    uuid: UUID
    auth_user_uuid: str
    provider_code: str
    title: str
    first_name: str
    middle_name: str
    last_name: str
    gender: str
    dob: date
    email: str
    phone: str
    department_uuid: str
    department_name: Optional[str] = None
    designation: str
    employment_type: str
    consultation_fee: Decimal
    followup_fee: Decimal
    emergency_fee: Decimal
    license_number: str
    registration_number: str
    remarks: Optional[str] = None
    status: bool

    # addresses: list[PatientAddressResponse] = []
    # contact: list[PatientContactResponse] = []

    class Config:
        from_attributes = True







