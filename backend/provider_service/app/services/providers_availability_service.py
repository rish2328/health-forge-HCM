from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
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


    @staticmethod
    def get_availability_by_availability_id ( db, provider_uuid, availability_id ):
        provider = db.query(ProvidersModel).filter(ProvidersModel.uuid == provider_uuid).first()
        if not provider:
            raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Provider not found!" )

        availability = db.query(ProviderAvailabilityModel).filter(ProviderAvailabilityModel.id == availability_id).first()
        if not availability:
            raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Provider Availability not found!" )

        return availability


    @staticmethod
    def create_availability ( db, availability_req ):
        try:
            data = availability_req.dict()

            provider = db.query(ProvidersModel).filter(ProvidersModel.uuid == data["provider_uuid"]).first()
            if not provider:
                raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Provider not found!" )

            availability_data = {
                "provider_id":      provider.id,
                "week_days":        data["week_days"],
                "start_time":       data["start_time"],
                "end_time":         data["end_time"],
                "slot_duration":    data["slot_duration"],
                "max_patients":     data["max_patients"],
                "break_start":      data["break_start"],
                "break_end":        data["break_end"],
                "is_available":     data["is_available"],
            }

            if data.get("remarks"):
                availability_data["remarks"] = data["remarks"].strip().capitalize()

            availability = ProviderAvailabilityModel( **availability_data )
            db.add ( availability )
            db.commit()
            db.refresh ( availability )
            return availability
        except HTTPException:
            db.rollback()
            raise
        except IntegrityError as ie:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = str(ie) )
        except Exception as ex:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(ex) )
