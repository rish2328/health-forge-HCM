from datetime import datetime
from app.core.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, Text


class PatientNoteModel ( Base ):
    __tablename__   =   "patient_notes"

    id              =   Column ( Integer, primary_key = True, index = True)
    patient_id      =   Column ( Integer, ForeignKey ("patients.id") )
    patient         =   relationship ( "PatientModel", back_populates = "notes" )

    note            =   Column ( Text, nullable = True )

    created_by      =   Column( UUID(as_uuid=True), nullable=False, unique=True, index=True, comment="User UUID from Auth Service DB" )

    created_at      =   Column ( DateTime, default = datetime.utcnow )
    updated_at      =   Column ( DateTime, default = datetime.utcnow, onupdate = datetime.utcnow )

