import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent.parent))

from fastapi import FastAPI
from app.core.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from app.models import patients_model, patient_addresses_model, patient_contacts_model, patient_insurances_model, patient_guardians_model, patient_documents_model, patient_notes_model
from app.api import patient_route, patient_address_route, patient_contact_route, patient_insurance_route


Base.metadata.create_all ( bind = engine )
app = FastAPI ( title = "Health Forge ( A Health Care Management System )")

origins = [
    "http://localhost:5100",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router ( patient_route.router )
app.include_router ( patient_address_route.router )
app.include_router ( patient_contact_route.router )
app.include_router ( patient_insurance_route.router )