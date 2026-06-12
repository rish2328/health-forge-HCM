from typing import Annotated
from fastapi import Depends
from common_service.security import oauth2Bearer
from common_service.security import verify_access_token
from app.dependencies.auth_service_client import AuthServiceClient


class AuthDependency:

    @staticmethod
    def get_current_user( token: str = Depends(oauth2Bearer) ):
        payload = verify_access_token ( token )
        user_uuid = payload["user_uuid"]
        user = AuthServiceClient.get_user ( user_uuid, token )

        return { "token": token, "user": user }

# ADD THIS AFTER THE CLASS
Auth_Dependency = Annotated[ dict, Depends(AuthDependency.get_current_user) ]
