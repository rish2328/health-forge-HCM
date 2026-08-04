from datetime import datetime
from app.core.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Boolean, Date, DateTime, ForeignKey, Text


class ProviderDocumentsModel ( Base ):
    __tablename__ = "provider_documents"

    id              =   Column ( Integer, primary_key = True, index = True )

    provider_id     =   Column( Integer, ForeignKey ( "providers.id" ), nullable = False )
    provider        =   relationship ( "ProvidersModel", back_populates = "documents" )

    document_type   =   Column ( String(50), nullable = False )
    document_name   =   Column ( String(150), nullable = False )

    document_number =   Column ( String(100), nullable = True )
    file_path       =   Column ( String(255), nullable = False )

    issue_date      =   Column ( Date, nullable = True )
    expiry_date     =   Column ( Date, nullable = True )

    is_verified     =   Column ( Boolean, default = False )
    remarks         =   Column ( Text, nullable = True )

    created_at      =   Column ( DateTime, default = datetime.utcnow )
    updated_at      =   Column ( DateTime, default = datetime.utcnow, onupdate = datetime.utcnow )