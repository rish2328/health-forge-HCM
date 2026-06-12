from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base


class RolePermissionsModel ( Base ):
    __tablename__ = "role_permissions"

    role_id = Column( Integer, ForeignKey("roles.id", ondelete = "CASCADE"), primary_key = True )
    permission_id = Column( Integer, ForeignKey("permissions.id", ondelete = "CASCADE"), primary_key = True )

    role = relationship( "RolesModel", back_populates = "permissions" )
    permission = relationship( "PermissionsModel", back_populates = "roles" )
    