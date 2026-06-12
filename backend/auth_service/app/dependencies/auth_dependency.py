from starlette import status
from typing import Annotated
from sqlalchemy.orm import Session
from app.core.database import get_db
from fastapi import HTTPException, Depends
from app.models.user_model import UserModel
from common_service.security import verify_access_token, oauth2Bearer


class AuthDependency:

    @staticmethod
    def get_current_user ( db: Annotated[ Session, Depends(get_db)], token: Annotated[str, Depends(oauth2Bearer)] ):
        payload = verify_access_token( token )

        user_id = payload.get('user_id')
        user_email = payload.get('email')

        if user_id is None or user_email is None:
            raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED )

        auth = db.query(UserModel).filter(UserModel.id == user_id).first()
        return auth

# ADD THIS AFTER THE CLASS
Auth_Dependency = Annotated[ UserModel, Depends(AuthDependency.get_current_user) ]
