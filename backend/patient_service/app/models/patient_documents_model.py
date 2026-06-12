from datetime import datetime
from app.core.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, Boolean


class PatientDocumentModel ( Base ):
    __tablename__   =   "patient_documents"

    id              =   Column ( Integer, primary_key = True, index = True)
    patient_id      =   Column ( Integer, ForeignKey ("patients.id") )
    patient         =   relationship ( "PatientModel", back_populates = "document" )

    document_type   =   Column ( String(100), nullable = True )
    file_name       =   Column ( String(100), nullable = True )
    file_path       =   Column ( String(50), nullable = True )

    uploaded_by     =   Column( UUID(as_uuid=True), nullable=False, unique=True, index=True, comment="User UUID from Auth Service DB" )

    created_at      =   Column ( DateTime, default = datetime.utcnow )
    updated_at      =   Column ( DateTime, default = datetime.utcnow, onupdate = datetime.utcnow )

