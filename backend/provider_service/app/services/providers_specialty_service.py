from sqlalchemy import func
from starlette import status
from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from app.helpers.provider_helper import ProviderHelper
from app.models.provider_specialties_model import ProviderSpecialtiesModel


class ProvidersSpecialtyService:

    @staticmethod
    def get_all_specialty_by_provider_uuid ( db, provider_uuid ):
        provider = ProviderHelper.check_provider_exists(db, provider_uuid)
        if not provider:
            raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Provider not found!" )

        specialty = db.query(ProviderSpecialtiesModel) \
                                .filter(ProviderSpecialtiesModel.provider_id == provider.id) \
                                .order_by(ProviderSpecialtiesModel.id.desc()) \
                                .all()

        return specialty


    @staticmethod
    def get_specialty_by_specialty_id ( db, provider_uuid, specialty_id ):
        provider = ProviderHelper.check_provider_exists(db, provider_uuid)
        if not provider:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Provider not found!")

        specialty = db.query(ProviderSpecialtiesModel) \
                                .filter(ProviderSpecialtiesModel.id == specialty_id) \
                                .filter(ProviderSpecialtiesModel.provider_id == provider.id) \
                                .order_by(ProviderSpecialtiesModel.id.desc()) \
                                .all()

        return specialty


    @staticmethod
    def create_specialty ( db, specialty_req ):
        try:
            data = specialty_req.dict()

            # CHECK PROVIDER SPECIALTY EXISTS OR NOT
            provider = ProviderHelper.check_provider_exists(db, data["provider_uuid"])
            if not provider:
                raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Provider not found!" )

            # CHECK PROVIDER SPECIALTY EXISTS WITH REQUESTED NAME OR NOT
            specialty_exist = db.query(ProviderSpecialtiesModel) \
                                .filter( func.lower(ProviderSpecialtiesModel.specialty_name) == func.lower(data["specialty_name"]) ) \
                                .filter(ProviderSpecialtiesModel.provider_id == provider.id) \
                                .first()
            if specialty_exist:
                raise HTTPException ( status_code = status.HTTP_409_CONFLICT, detail = "Provider Specialty with this name, already exist!" )

            # PREPARE DATA TO STORE IT IN DB
            specialty_arr = {
                "provider_id": provider.id,
                "specialty_name": data["specialty_name"].strip().title(),
                "is_primary": data["is_primary"]
            }

            # INSERT FORM DATA INTO DB
            specialty = ProviderSpecialtiesModel ( **specialty_arr )
            db.add(specialty)
            db.commit()
            db.refresh(specialty)
            return specialty
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
    def delete_specialty ( db, provider_uuid, specialty_id ):
        try:
            # CHECK PROVIDER EXISTS OR NOT
            provider = ProviderHelper.check_provider_exists(db, provider_uuid)
            if not provider:
                raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Provider not found!" )

            # CHECK PROVIDER SPECIALTY EXISTS OR NOT
            specialty = db.query(ProviderSpecialtiesModel).filter(ProviderSpecialtiesModel.id == specialty_id) \
                                                    .filter(ProviderSpecialtiesModel.provider_id == provider.id) \
                                                    .first()
            if not specialty:
                raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Provider Specialty not found!" )

            # DELETE SPECIFIC SPECIALTY FROM DB
            db.delete(specialty)
            db.commit()
            return True
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
    def update_specialty ( db, provider_uuid, specialty_id, specialty_req ):
        try:
            data = specialty_req.dict()

            # CHECK PROVIDER EXISTS OR NOT
            provider = ProviderHelper.check_provider_exists(db, provider_uuid)
            if not provider:
                raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Provider not found!" )

            # CHECK PROVIDER SPECIALTY EXISTS OR NOT
            specialty_exist = db.query(ProviderSpecialtiesModel).filter(ProviderSpecialtiesModel.id == specialty_id) \
                                    .filter(ProviderSpecialtiesModel.provider_id == provider.id) \
                                    .first()
            if not specialty_exist:
                raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Provider Specialty not found!" )

            # CHECK PROVIDER SPECIALTY EXISTS WITH REQUESTED NAME OR NOT
            specialty_name_exist = db.query(ProviderSpecialtiesModel) \
                                .filter(func.lower(ProviderSpecialtiesModel.specialty_name) == func.lower(data["specialty_name"])) \
                                .filter(ProviderSpecialtiesModel.provider_id == provider.id) \
                                .filter(ProviderSpecialtiesModel.id != specialty_id) \
                                .first()
            if specialty_name_exist:
                raise HTTPException ( status_code = status.HTTP_409_CONFLICT, detail = "Provider Specialty with this name, already exist!" )

            # UPDATE FORM FIELD INTO DB
            specialty_exist.specialty_name = data["specialty_name"].strip().title()
            specialty_exist.is_primary = data["is_primary"]

            db.add(specialty_exist)
            db.commit()
            db.refresh(specialty_exist)
            return specialty_exist
        except HTTPException:
            db.rollback()
            raise
        except IntegrityError as ie:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = str(ie) )
        except Exception as ex:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = str(ex) )