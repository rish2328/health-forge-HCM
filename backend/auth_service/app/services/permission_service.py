from starlette import status
from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from app.models.permissions_model import PermissionsModel
import re


class PermissionService:

    # GET LIST OF ALL ROLES
    @staticmethod
    def get_all_permissions ( db ):
        all_permissions = db.query(PermissionsModel).all()
        return all_permissions


    # GET ROLE BY ROLE ID
    @staticmethod
    def get_permission_by_permission_uuid ( db, permission_uuid ):
        permission = db.query(PermissionsModel).filter(PermissionsModel.uuid == permission_uuid).first()
        return permission


    # CREATE NEW PERMISSION
    @staticmethod
    def create_permission ( db, permission_data ):
        try:
            data = permission_data.dict()
            data['name'] = re.sub(r'[^a-zA-Z0-9]+', '-', data["name"].lower()).strip('-')
            data['display_name'] = re.sub(r'\s+', ' ', data["display_name"]).strip()
            data['group_name'] = re.sub(r'\s+', ' ', data["group_name"]).strip()

            existingPermission = db.query(PermissionsModel) \
                                .filter(PermissionsModel.name == data['name']) \
                                .filter(PermissionsModel.display_name == data['display_name']).first()
            if existingPermission:
                raise HTTPException ( status_code = status.HTTP_409_CONFLICT, detail = "The Permission with this name, is already created. Try with another!" )

            if data['description']:
                data['description'] = data['description'].strip().capitalize()

            permission = PermissionsModel(**data)
            db.add ( permission )
            db.commit()
            db.refresh ( permission )
            return permission

        except IntegrityError as ie:
            db.rollback()
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ie))

        except Exception as ex:
            db.rollback()
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(ex))


    # UPDATE EXISTING PERMISSION
    @staticmethod
    def update_permission ( db, permission_uuid, permission_data):
        try:
            permission = db.query(PermissionsModel).filter(PermissionsModel.uuid == permission_uuid).first()
            if not permission:
                raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Role Not Found!")

            permissionData = permission_data.dict()
            permission.name = re.sub(r'[^a-zA-Z0-9]+', '-', permissionData["name"].lower()).strip('-')
            permission.display_name = re.sub(r'\s+', ' ', permissionData["display_name"]).strip()
            permission.group_name = re.sub(r'\s+', ' ', permissionData["group_name"]).strip()

            existingPermission = db.query(PermissionsModel).filter(PermissionsModel.name == permission.name) \
                                                .filter(PermissionsModel.display_name == permission.display_name) \
                                                .filter(PermissionsModel.uuid != permission_uuid).first()
            if existingPermission:
                raise HTTPException ( status_code = status.HTTP_409_CONFLICT, detail = "The Permission with this name, is already created. Try with another!")

            if permissionData['description']:
                permission.description = permissionData['description'].strip().capitalize()


            db.add(permission)
            db.commit()
            db.refresh(permission)
            return permission
        
        except IntegrityError as ie:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = str(ie) )

        except Exception as ex:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(ex) )


    @staticmethod
    def delete_permission ( db, permission_uuid ):
        permissionExist = db.query(PermissionsModel).filter(PermissionsModel.uuid == permission_uuid).first()
        if not permissionExist:
            raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Permission Not Found!")
        
        db.delete(permissionExist)
        db.commit()
        return True


    # @staticmethod
    # def assign_permission_to_role ( db, assign_data ):
    #     return



