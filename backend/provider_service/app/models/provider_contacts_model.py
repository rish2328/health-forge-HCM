from enum import Enum as PyEnum
from sqlalchemy import Column, Integer, String, Enum, ForeignKey, Boolean, DateTime
from datetime import datetime
from app.core.database import Base
from sqlalchemy.orm import relationship


class ContactTypeEnum ( str, PyEnum ):
    Mobile  =   "Mobile"
    Phone   =   "Phone"
    Email   =   "Email"
    Fax     =   "Fax"
    Emergency   =   "Emergency"


class ProviderContactsModel ( Base ):
    __tablename__ = "provider_contacts"

    id              =   Column ( Integer, primary_key = True, index = True )

    provider_id     =   Column ( Integer, ForeignKey ("providers.id"), nullable = False )
    provider        =   relationship ( "ProvidersModel", back_populates = "contacts" )

    contact_type    =   Column ( Enum (ContactTypeEnum, name = "contact_type_enum"), nullable = True )
    contact         =   Column ( String (150), nullable = True )
    is_primary      =   Column ( Boolean, default = False )

    created_at      =   Column ( DateTime, default = datetime.utcnow )
    updated_at      =   Column ( DateTime, default = datetime.utcnow, onupdate = datetime.utcnow )



