import requests
from common_service.config import commonSettings



class AuthServiceClient:

    @staticmethod
    def get_user ( user_uuid, token ):
        response = requests.get(
            f"{commonSettings.AUTH_SERVICE_URL}/internal/user/{user_uuid}",
            headers={
                "Authorization": f"Bearer {token}"
            }
        )

        return response.json()["data"]

    @staticmethod
    def create_user ( token, user_data ):
        response = requests.post(
            f"{commonSettings.AUTH_SERVICE_URL}/internal/user",
            headers={
                "Authorization": f"Bearer {token}"
            },
            json=user_data
        )

        response.raise_for_status()
        return response.json()["data"]