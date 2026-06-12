from pydantic import BaseModel
from typing import Optional


class CreatePatientAddress ( BaseModel ):
    patient_id: int
    address_line_1: str
    address_line_2: Optional[str] = None
    city: str
    state: str
    country: str
    postal_code: str
    address_type: str


class UpdatePatientAddress ( BaseModel ):
    patient_id: int
    address_line_1: str
    address_line_2: Optional[str] = None
    city: str
    state: str
    country: str
    postal_code: str
    address_type: str


class PatientAddressResponse ( BaseModel ):
    address_line_1: str
    address_line_2: Optional[str] = None
    city: str
    state: str
    country: str
    postal_code: str
    address_type: str

    class Config:
        from_attributes = True
