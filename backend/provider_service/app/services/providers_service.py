from starlette import status
from fastapi import HTTPException
from sqlalchemy.orm import selectinload
from sqlalchemy.exc import IntegrityError
from app.utils.common import get_provider_code
from app.models.providers_model import ProvidersModel
from app.dependencies.auth_service_client import AuthServiceClient
from app.helpers.provider_helper import ProviderHelper
from app.schemas.providers_schema import ProviderResponse


class ProvidersService:

    # GET ALL PROVIDERS
    @staticmethod
    def get_providers ( db, token ):
        provider_list = []
        providers = ( db.query( ProvidersModel )
                        .options(
                            selectinload( ProvidersModel.contacts ),
                            selectinload( ProvidersModel.addresses ),
                            selectinload( ProvidersModel.specialties ),
                            selectinload( ProvidersModel.availabilities ),
                            selectinload( ProvidersModel.documents )
                        )
                        .order_by( ProvidersModel.id.desc() )
                        .all()
                    )

        for provider in providers:
            department = None
            if provider.department_uuid:
                department = ProviderHelper.get_provider_department_by_department_uuid ( provider.department_uuid, token )

            provider_data = ProviderResponse.model_validate(provider).model_dump()

            provider_data["department_name"] = ( department["name"] if department else None )
            provider_list.append(provider_data)

        return provider_list


    # CREATE PROVIDER
    @staticmethod
    def create_provider ( db, provider_data, token ):
        user = None
        try:
            data = provider_data.dict()
            role_name = data.pop("role_name")

            exist_provider = db.query(ProvidersModel).filter(ProvidersModel.email == data["email"]).first()
            if exist_provider:
                raise HTTPException ( status_code = status.HTTP_409_CONFLICT, detail = "Provider already created with this email, Try with another email!" )

            # CREATE USER FOR LOGIN INTO THE PROVIDER PORTAL
            user = AuthServiceClient.create_user_at_auth_service(
                token,
                {
                    "first_name": data["first_name"].strip().title(),
                    "middle_name": (
                        data["middle_name"].strip().title()
                        if data.get("middle_name")
                           and data["middle_name"].strip()
                        else None
                    ),
                    "last_name": data["last_name"].strip().title(),
                    "email": data["email"],
                    "phone": data["phone"],
                    "password": "12345678",
                    "role": role_name
                }
            )

            data['auth_user_uuid']  =   user['uuid']
            data['provider_code']   =   get_provider_code(db)
            data["first_name"]      =   data["first_name"].strip().title()

            if data.get("middle_name"):
                data["middle_name"] =   data["middle_name"].strip().title()

            data["last_name"]       =   data["last_name"].strip().title()

            provider = ProvidersModel ( **data )
            db.add ( provider )
            db.commit()
            db.refresh ( provider )
            return provider
        except HTTPException:
            db.rollback()
            if user:
                AuthServiceClient.delete_user_at_auth_service( token, user["uuid"] )
            raise
        except IntegrityError as ie:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = str(ie) )
        except Exception as ex:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(ex) )


    # UPDATE PROVIDER
    @staticmethod
    def update_provider ( db, provider_uuid, provider_data, token ):
        pass



















