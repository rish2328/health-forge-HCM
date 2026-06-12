from pydantic import BaseModel
from typing import Optional


class CreatePatientDocument ( BaseModel ):
    patient_id: int
    document_type: str
    file_name: str
    file_path: str


class UpdatePatientDocument ( BaseModel ):
    patient_id: int
    document_type: str
    file_name: str
    file_path: str


class PatientDocumentResponse ( BaseModel ):
    document_type: str
    file_name: str
    file_path: str

    class Config:
        from_attributes = True