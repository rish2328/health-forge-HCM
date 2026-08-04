import requests
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