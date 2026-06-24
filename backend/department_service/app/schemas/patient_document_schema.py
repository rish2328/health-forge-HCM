from pydantic import BaseModel
from typing import Optional


class CreatePatientDocumentRequest ( BaseModel ):
    patient_id: int
    document_type: str
    file_name: str
    file_path: str


class UpdatePatientDocumentRequest ( BaseModel ):
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