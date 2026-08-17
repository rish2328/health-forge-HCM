from fastapi import HTTPException
from starlette import status
from app.models.providers_availability_model import ProviderAvailabilityModel
from app.models.providers_model import ProvidersModel


class ProvidersAvailabilityService:

    @staticmethod
    def get_all_availability_by_provider_uuid ( db, provider_uuid ):
        provider = db.query(ProvidersModel).filter(ProvidersModel.uuid == provider_uuid).first()
        if not provider:
            raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Provider not found!" )

        availability = db.query(ProviderAvailabilityModel) \
                                .filter(ProviderAvailabilityModel.provider_id == provider.id) \
                                .order_by(ProviderAvailabilityModel.id.desc()) \
                                .all()
        return availability