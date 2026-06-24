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


    # CREATE USER AT AUTH_SERVICE_DB
    @staticmethod
    def create_user_at_auth_service ( token, user_data ):
        response = requests.post(
            f"{commonSettings.AUTH_SERVICE_URL}/internal/user",
            headers={
                "Authorization": f"Bearer {token}"
            },
            json=user_data
        )

        response.raise_for_status()
        return response.json()["data"]


    # DELETE USER BY USER UUID AND TOKEN AT AUTH_SERVICE_ID
    @staticmethod
    def delete_user_at_auth_service ( token, user_uuid ):
        response = requests.delete(
            f"{commonSettings.AUTH_SERVICE_URL}/internal/user/{user_uuid}",
            headers={
                "Authorization": f"Bearer {token}"
            }
        )

        response.raise_for_status()
        return response.json()["data"]


    # UPDATE USER BY USER UUID AND TOKEN AT AUTH_SERVICE_ID
    @staticmethod
    def update_user_at_auth_service (token, user_uuid, user_data):
        response = requests.put(
            f"{commonSettings.AUTH_SERVICE_URL}/internal/user/{user_uuid}",
            headers={
                "Authorization": f"Bearer {token}"
            },
            json=user_data
        )

        response.raise_for_status()
        return response.json()["data"]