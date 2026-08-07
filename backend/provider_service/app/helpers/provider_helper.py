import requests
from app.models.providers_model import ProvidersModel
from app.schemas.providers_schema import ProviderResponse
from common_service.config import commonSettings


class ProviderHelper:

    @staticmethod
    def get_provider_department_by_department_uuid ( uuid, token ):
        response = requests.get(
            f"{commonSettings.DEPARTMENT_SERVICE_URL}/internal/department/{uuid}",
            headers={
                "Authorization": f"Bearer {token}"
            }
        )
        response.raise_for_status()
        return response.json()["data"]


    @staticmethod
    def get_provider_by_provider_uuid(db, provider_uuid, token):
        provider = db.query(ProvidersModel).filter(ProvidersModel.uuid == provider_uuid).first()

        if provider:
            response = requests.get(
                f"{commonSettings.AUTH_SERVICE_URL}/internal/user/{provider.auth_user_uuid}",
                headers={ "Authorization": f"Bearer {token}" }
            )

            response.raise_for_status()
            user = response.json()["data"]

            role = None
            if user.get("roles") and len(user["roles"]) > 0:
                role = user["roles"][0]["role"]

            department = None
            if provider.department_uuid:
                department = ProviderHelper.get_provider_department_by_department_uuid(provider.department_uuid, token)


            provider.department_name = (department["name"] if department else None)
            provider.role_uuid = role["uuid"] if role else None
            provider.role_name = role["name"] if role else None
            provider.role_display_name = role["display_name"] if role else None

        return provider