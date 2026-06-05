from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from app.models.roles_model import RolesModel
from starlette import status


class RoleService:

    @staticmethod
    def create_role ( db, role_data ):
        try:
            data = role_data.dict()

            existingRole = db.query(RolesModel).filter(RolesModel.name == data["name"]).first()
            if existingRole:
                raise HTTPException ( status_code = status.HTTP_409_CONFLICT, detail = "The Role with this name, is already created. Try with another!")

            data['display_name'] = data["display_name"].strip().title()

            if data["description"]:
                data["description"] = data["description"].strip().capitalize()
            
            role = RolesModel(**data)
            db.add ( role )
            db.commit ()
            db.refresh ( role )
            return role

        except IntegrityError as ie:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = str(ie.orig) )

        except Exception as ex:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(ex) )
