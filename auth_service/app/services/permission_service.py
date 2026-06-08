from starlette import status
from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from app.models.roles_model import RolesModel


class RoleService:

    # GET LIST OF ALL ROLES
    @staticmethod
    def get_all_roles ( db ):
        all_roles = db.query(RolesModel).all()
        return all_roles


    # GET ROLE BY ROLE ID
    @staticmethod
    def get_role_by_role_uuid ( db, role_uuid ):
        role = db.query(RolesModel).filter(RolesModel.uuid == role_uuid).first()
        return role


    # CREATE NEW ROLE
    @staticmethod
    def create_role ( db, role_data ):
        try:
            data = role_data.dict()
            data['name'] = data["name"].lower().replace(" ", "-").replace("_", "-")
            data['display_name'] = data["display_name"].strip().title().replace("-", " ").replace("_", " ")

            existingRole = db.query(RolesModel).filter(RolesModel.name == data["name"]).filter(RolesModel.display_name == data['display_name']).first()
            if existingRole:
                raise HTTPException ( status_code = status.HTTP_409_CONFLICT, detail = "The Role with this name, is already created. Try with another!")

            if data["description"]:
                data["description"] = data["description"].strip().capitalize()
            
            role = RolesModel(**data)
            db.add ( role )
            db.commit ()
            db.refresh ( role )
            return role

        except IntegrityError as ie:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = str(ie) )

        except Exception as ex:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(ex) )


    @staticmethod
    def update_role ( db, role_uuid, role_data):
        try:
            role = db.query(RolesModel).filter(RolesModel.uuid == role_uuid).first()
            if not role:
                raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Role Not Found!")
            
            roleData = role_data.dict()
            role.name = roleData["name"].lower().replace(" ", "-").replace("_", "-")
            role.display_name = roleData["display_name"].strip().title().replace("-", " ").replace("_", " ")

            existingRole = db.query(RolesModel).filter(RolesModel.name == role.name).filter(RolesModel.display_name == role.display_name).filter(RolesModel.uuid != role_uuid).first()
            if existingRole:
                raise HTTPException ( status_code = status.HTTP_409_CONFLICT, detail = "The Role with this name, is already created. Try with another!")

            db.add(role)
            db.commit()
            db.refresh(role)
            return role
        
        except IntegrityError as ie:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = str(ie) )

        except Exception as ex:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(ex) )


    @staticmethod
    def delete_role ( db, role_uuid ):
        roleExist = db.query(RolesModel).filter(RolesModel.uuid == role_uuid).first()
        if not roleExist:
            raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Role Not Found!")
        
        db.delete(roleExist)
        db.commit()
        return True

    @staticmethod
    def create_permission( db, permission_data):
        return


    @staticmethod
    def assign_role_to_user( db, assign_data ):
        return
    

    @staticmethod
    def assign_permission_to_role ( db, assign_data ):
        return
    

    @staticmethod
    def get_user_permissions ( db, user_id ):
        return
    

    @staticmethod
    def get_user_roles ( db, user_id ):
        return

