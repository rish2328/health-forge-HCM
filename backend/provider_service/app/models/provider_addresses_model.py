from datetime import datetime
from enum import Enum as PyEnum
from app.core.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, Enum, Boolean


class AddressTypeEnum ( str, PyEnum ):
    HOME = "Home"
    OTHER = "Other"
    OFFICE = "Office"
    PERMANENT = "Permanent"


class ProviderAddressesModel ( Base ):
    __tablename__   =   "provider_addresses"

    id              =   Column ( Integer, primary_key = True, index = True )

    provider_id     =   Column ( Integer, ForeignKey ( "providers.id" ), nullable = False )
    provider        =   relationship ( "ProvidersModel", back_populates = "addresses" )

    address_type    =   Column ( Enum ( AddressTypeEnum, name = "address_type" ), nullable = True )
    address_line_1  =   Column ( String(100), nullable = True )
    address_line_2  =   Column ( String(100), nullable = True )
    city            =   Column ( String(100), nullable = True )
    state           =   Column ( String(100), nullable = True )
    country         =   Column ( String(100), nullable = True )
    postal_code     =   Column ( String(100), nullable = True )
    is_primary      =   Column ( Boolean, default = False )
    created_at      =   Column ( DateTime, default = datetime.utcnow )
    updated_at      =   Column ( DateTime, default = datetime.utcnow, onupdate = datetime.utcnow )
