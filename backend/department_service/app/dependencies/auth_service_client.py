import requests
from common_service.config import commonSettings



class AuthServiceClient:

    # GET USER BY USER UUID AND AUTH TOKEN FROM AUTH_SERVICE_DB
    @staticmethod
    def get_user_from_auth_service ( user_uuid, token ):
        response = requests.get(
            f"{commonSettings.AUTH_SERVICE_URL}/internal/user/{user_uuid}",
            headers={
                "Authorization": f"Bearer {token}"
            }
        )

        response.raise_for_status()
        return response.json()["data"]

