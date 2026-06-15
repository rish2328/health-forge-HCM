from pydantic import BaseModel
from uuid import UUID



class CreatePatientNoteRequest ( BaseModel ):
    patient_id: int
    note: str


class UpdatePatientNoteRequest ( BaseModel ):
    patient_id: int
    note: str


class PatientNoteResponse ( BaseModel ):
    note: str
    created_by: UUID

    class Config:
        from_attributes = True