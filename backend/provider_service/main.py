import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent.parent))

from fastapi import FastAPI
from app.core.database import Base,engine
from fastapi.middleware.cors import CORSMiddleware
from app.models import providers_model, provider_addresses_model, provider_contacts_model, provider_documents_model, provider_specialties_model, providers_availability_model
from app.api import providers_route, providers_availability_route, providers_specialty_route

Base.metadata.create_all ( bind = engine )
app = FastAPI( title = "Health Forge ( A Health Care Management System )" )

origins = [ "http://localhost:5100" ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


app.include_router ( providers_route.router )
app.include_router ( providers_availability_route.router )
app.include_router (providers_specialty_route.router )