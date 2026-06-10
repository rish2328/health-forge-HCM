import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent.parent))

from fastapi import FastAPI
from app.core.database import Base, engine
from app.models import patients_model, patient_addresses_model, patient_contacts_model, patient_insurances_model, patient_guardians_model, patient_documents_model, patient_notes_model
# from app.api import auth_route, role_route, user_route, permission_route


Base.metadata.create_all ( bind = engine )
app = FastAPI ( title = "Health Forge ( A Health Care Management System)")

# app.include_router ( auth_route.router )
# app.include_router ( role_route.router )
# app.include_router ( permission_route.router )
# app.include_router ( user_route.router )
