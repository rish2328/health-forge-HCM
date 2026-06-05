from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base


class UserRolesModel ( Base ):
    __tablename__ = "user_roles"

    user_id     =   Column ( Integer, ForeignKey("users.id", ondelete="SET NULL"), primary_key = True, index = True )
    role_id     =   Column ( Integer, ForeignKey("roles.id", ondelete="SET NULL"), primary_key = True, index = True )
    user = relationship( "UserModel", back_populates="roles" )
    role = relationship( "RolesModel" )
    
