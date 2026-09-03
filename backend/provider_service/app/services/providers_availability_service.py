from starlette import status
from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from app.models.providers_model import ProvidersModel
from app.helpers.provider_helper import ProviderHelper
from app.models.providers_availability_model import ProviderAvailabilityModel


class ProvidersAvailabilityService:

    @staticmethod
    def get_all_availability_by_provider_uuid ( db, provider_uuid ):
        provider = ProviderHelper.check_provider_exists(db, provider_uuid)
        if not provider:
            raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Provider not found!" )

        availability = db.query(ProviderAvailabilityModel) \
                                .filter(ProviderAvailabilityModel.provider_id == provider.id) \
                                .order_by(ProviderAvailabilityModel.id.desc()) \
                                .all()
        return availability


    @staticmethod
    def get_availability_by_availability_id ( db, provider_uuid, availability_id ):
        provider = ProviderHelper.check_provider_exists(db, provider_uuid)
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

            provider = ProviderHelper.check_provider_exists(db, data["provider_uuid"])
            if not provider:
                raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Provider not found!" )

            # # CHECK AVAILABILITY, ALREADY AVAILABLE ALONG WITH THE SPECIFIC PROVIDER AND SPECIFIC WEEK DAY
            # check_availability = db.query(ProviderAvailabilityModel) \
            #                                 .filter(ProviderAvailabilityModel.provider_id == provider.id) \
            #                                 .filter(ProviderAvailabilityModel.week_days == data["week_days"]) \
            #                                 .first()
            # if check_availability:
            #     raise HTTPException ( status_code = status.HTTP_409_CONFLICT,
            #                                 detail = f"The Availability for {data['week_days']}, is already exist. Try with another weekdays!")

            availability_data = {
                "provider_id":      provider.id,
                "week_days":        data["week_days"],
                "start_time":       data["start_time"],
                "end_time":         data["end_time"],
                "slot_duration":    data["slot_duration"],
                "max_patients":     data["max_patients"],
                "break_start":      data["break_start"],
                "break_end":        data["break_end"],
                "is_available":     data["is_available"]
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


    @staticmethod
    def delete_availability ( db, provider_uuid, availability_id ):
        try:
            provider = ProviderHelper.check_provider_exists(db, provider_uuid)
            if not provider:
                raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Provider not found!" )

            availability = db.query(ProviderAvailabilityModel) \
                                    .filter(ProviderAvailabilityModel.provider_id == provider.id) \
                                    .filter(ProviderAvailabilityModel.id == availability_id) \
                                    .first()
            if not availability:
                raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Provider availability not found!" )

            db.delete(availability)
            db.commit()
            return True

        except HTTPException:
            db.rollback()
            raise
        except IntegrityError as ie:
            db.rollback()
            raise HTTPException ( status_code =  status.HTTP_400_BAD_REQUEST, detail = str(ie) )
        except Exception as ex:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(ex) )


    @staticmethod
    def update_availability ( db, provider_uuid, availability_id, availability_req ):
        try:
            data = availability_req.dict()

            provider = ProviderHelper.check_provider_exists(db, provider_uuid)
            if not provider:
                raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Provider not found!" )

            availability_exist = db.query(ProviderAvailabilityModel) \
                                            .filter(ProviderAvailabilityModel.provider_id == provider.id) \
                                            .filter(ProviderAvailabilityModel.id == availability_id) \
                                            .first()
            if not availability_exist:
                raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Provider availability not found!" )

            availability_exist.week_days        =   data["week_days"]
            availability_exist.start_time       =   data["start_time"]
            availability_exist.end_time         =   data["end_time"]
            availability_exist.slot_duration    =   data["slot_duration"]
            availability_exist.max_patients     =   data["max_patients"]
            availability_exist.break_start      =   data["break_start"]
            availability_exist.break_end        =   data["break_end"]
            availability_exist.is_available     =   data["is_available"]

            if data.get("remarks"):
                availability_exist.remarks = data["remarks"].strip().capitalize()

            db.add(availability_exist)
            db.commit()
            db.refresh(availability_exist)
            return availability_exist

        except HTTPException:
            db.rollback()
            raise
        except IntegrityError as ie:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = str(ie) )
        except Exception as ex:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(ex) )
