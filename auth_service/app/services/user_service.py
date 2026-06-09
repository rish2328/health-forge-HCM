from starlette import status
from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from app.models.user_model import UserModel



class UserService:

    # GET LIST OF ALL USERS
    @staticmethod
    def get_all_users ( db ):
        all_users = db.query(UserModel).all()
        return all_users


    # GET ROLE BY ROLE ID
    @staticmethod
    def get_user_by_user_uuid ( db, user_uuid ):
        user = db.query(UserModel).filter(UserModel.uuid == user_uuid).first()
        return user

