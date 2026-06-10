from starlette import status
from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import selectinload
from app.models.user_model import UserModel
from app.models.roles_model import RolesModel
from app.models.user_roles_model import UserRolesModel
from app.models.role_permissions_model import RolePermissionsModel



class UserService:

    # GET LIST OF ALL USERS
    @staticmethod
    def get_all_users ( db ):
        all_users = ( db.query(UserModel)
                    .options(
                        selectinload(UserModel.roles)
                            .selectinload(UserRolesModel.role)
                            .selectinload(RolesModel.permissions)
                            .selectinload(RolePermissionsModel.permission)
                    )
                    .all() )
        return all_users


    # GET ROLE BY ROLE ID
    @staticmethod
    def get_user_by_user_uuid ( db, user_uuid ):
        user = (db.query(UserModel).filter(UserModel.uuid == user_uuid)
                .options(
                    selectinload(UserModel.roles)
                        .selectinload(UserRolesModel.role)
                        .selectinload(RolesModel.permissions)
                        .selectinload(RolePermissionsModel.permission)
                )
                .first())
        return user

