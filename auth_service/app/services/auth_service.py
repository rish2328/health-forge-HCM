from starlette import status
from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from app.models.user_model import UserModel
from app.core.security import hash_password, verify_password, create_access_token


class AuthService:

    @staticmethod
    def auth_register_service( db, auth_user ):
        try:
            data = auth_user.dict()

            existingUser = db.query(UserModel).filter(UserModel.email == data["email"]).first()
            if existingUser:
                raise HTTPException( status_code = status.HTTP_409_CONFLICT, detail = "This email is already taken, Try with another email!" )

            data["first_name"] = data["first_name"].strip().title()
            
            if data["middle_name"]:
                data["middle_name"] = data["middle_name"].strip().title()

            data["last_name"] = data["last_name"].strip().title()

            data['password'] = hash_password( data['password'] )

            auth = UserModel(**data)
            db.add ( auth )
            db.commit ()
            db.refresh ( auth )
            return auth

        except IntegrityError as ie:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = str(ie) )

        except Exception as ex:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(ex) )


    @staticmethod
    def auth_login_service ( db, email, password ):
        try:
            authUser = db.query(UserModel).filter(UserModel.email == email).first()
            if not authUser:
                raise HTTPException( status_code = status.HTTP_404_NOT_FOUND, detail = "User with this email, not found!")
            
            if not verify_password ( password, authUser.password ):
                raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Invalid credentials, Try with correct one!")
            
            auth_token = create_access_token({ "sub": str(authUser.id), "user_id": authUser.id, "email": authUser.email })
            return auth_token

        except Exception as ex:
            raise HTTPException ( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(ex) )


    # @staticmethod
    # def create_permission( db, permission_data):
    #     return

    # @staticmethod
    # def assign_permission_to_role ( db, assign_data ):
    #     return
    

    # @staticmethod
    # def get_user_permissions ( db, user_id ):
    #     return


