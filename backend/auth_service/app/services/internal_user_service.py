from starlette import status
from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import selectinload
from app.models.user_model import UserModel
from app.models.roles_model import RolesModel
from app.models.user_roles_model import UserRolesModel
from app.models.role_permissions_model import RolePermissionsModel
from app.core.security import hash_password



class InternalUserService:

    # GET USER BY USER UUID
    @staticmethod
    def get_internal_user_by_user_uuid ( db, user_uuid ):
        user = (db.query(UserModel).filter(UserModel.uuid == user_uuid)
                .options(
                    selectinload(UserModel.roles)
                        .selectinload(UserRolesModel.role)
                        .selectinload(RolesModel.permissions)
                        .selectinload(RolePermissionsModel.permission)
                )
                .first())
        return user


    # CREATE USER
    @staticmethod
    def create_internal_user(db, user_data ):
        try:
            data = user_data.dict()
            role_name = data.pop("role")

            existingUser = db.query(UserModel).filter(UserModel.email == data["email"]).first()
            if existingUser:
                raise HTTPException(status_code = status.HTTP_409_CONFLICT, detail = "This email is already taken, Try with another email!")

            data["first_name"] = data["first_name"].strip().title()

            if data["middle_name"]:
                data["middle_name"] = data["middle_name"].strip().title()

            data["last_name"] = data["last_name"].strip().title()

            data['password'] = hash_password(data["password"])

            user = UserModel(**data)
            db.add(user)
            db.flush()

            # FINDING ROLE ON ROLES TABLE
            role = db.query(RolesModel).filter( RolesModel.name == role_name ).first()
            if not role:
                raise HTTPException( status_code = status.HTTP_404_NOT_FOUND, detail = f"Role '{role_name}' not found" )

            # ASSIGNING ROLE TO SPECIFIC USER
            user_role = UserRolesModel( user_id = user.id, role_id = role.id )
            db.add(user_role)

            db.commit()
            db.refresh(user)
            return user

        except IntegrityError as ie:
            db.rollback()
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ie))

        except Exception as ex:
            db.rollback()
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(ex))


    # DELETE EXISTING USER BY USER UUID
    @staticmethod
    def delete_internal_user_by_user_uuid(db, user_uuid):
        try:
            user_exist = db.query(UserModel).filter(UserModel.uuid == user_uuid).first()
            if not user_exist:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User Not Found!")

            db.delete(user_exist)
            db.commit()
            return True

        except IntegrityError as ie:
            db.rollback()
            raise HTTPException( status_code = status.HTTP_400_BAD_REQUEST, detail = str(ie) )

        except Exception as ex:
            db.rollback()
            raise HTTPException( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(ex) )


    # UPDATE EXISTING USER BY USER UUID AND USER DATA
    @staticmethod
    def update_internal_user_by_user_uuid(db, user_uuid, user_req):
        # Check User
        user_exist = db.query(UserModel).filter( UserModel.uuid == user_uuid ).first()
        if not user_exist:
            raise HTTPException( status_code = status.HTTP_404_NOT_FOUND, detail = "User not found!" )

        # Request Data
        user_data = user_req.dict()

        # Update User Information
        user_exist.first_name = user_data["first_name"].strip().title()

        if user_data.get("middle_name"):
            user_exist.middle_name = user_data["middle_name"].strip().title()
        else:
            user_exist.middle_name = None

        user_exist.last_name = user_data["last_name"].strip().title()
        user_exist.email = user_data["email"]
        user_exist.phone = user_data["phone"]

        # Update User Role
        if user_data.get("role"):
            # Find Role by Name
            role = db.query(RolesModel).filter( RolesModel.name == user_data["role"] ).first()
            if not role:
                raise HTTPException( status_code = status.HTTP_404_NOT_FOUND, detail = "Role not found!" )

            # Get Existing User Role
            user_role = db.query(UserRolesModel).filter( UserRolesModel.user_id == user_exist.id ).first()

            if user_role:
                # Update only if role changed
                if user_role.role_id != role.id:
                    user_role.role_id = role.id

                    db.add(user_role)
            else:
                # Assign role if no role exists
                db.add( UserRolesModel( user_id = user_exist.id, role_id = role.id ) )

        # Save Changes
        db.add(user_exist)
        db.commit()
        db.refresh(user_exist)
        return user_exist


