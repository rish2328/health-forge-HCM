from pydantic import BaseModel
from datetime import date


class CreatePatientInsuranceRequest ( BaseModel ):
    patient_id: int
    provider_name: str
    policy_number: str
    group_number: str
    subscriber_name: str
    effective_date: date
    expiry_date: date


class UpdatePatientInsuranceRequest ( BaseModel ):
    patient_id: int
    provider_name: str
    policy_number: str
    group_number: str
    subscriber_name: str
    effective_date: date
    expiry_date: date


class PatientInsuranceResponse ( BaseModel ):
    provider_name: str
    policy_number: str
    group_number: str
    subscriber_name: str
    effective_date: date
    expiry_date: date

    class Config:
        from_attributes = True