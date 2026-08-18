# HealthForge - Setup Guide

HealthForge is a healthcare management application built with:

- **Frontend:** React 19 + Vite + Material UI
- **Backend:** FastAPI microservices
- **Database:** PostgreSQL 16
- **ORM:** SQLAlchemy
- **Authentication:** JWT
- **HTTP client:** Axios
- **Frontend validation:** React Hook Form + Yup
- **Backend dependency management:** Poetry
- **Containerization:** Docker / Docker Compose

This guide explains how to set up the complete project on another PC from the supplied source code.

---

## 1. Project Structure

After extracting the project, the important structure is:

```text
HealthForge-FastAPI/
├── backend/
│   ├── auth_service/
│   ├── patient_service/
│   ├── department_service/
│   ├── provider_service/
│   ├── common_service/
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── package-lock.json
│   ├── .env
│   ├── Dockerfile
│   └── docker-compose.yml
│
└── README.md
```

### Backend services
```bash
| Service           | Purpose                                               | Docker Container  | PostgreSQL Docker     |
|                   |                                                       | API Port          | Container Host Port   |
|-------------------|-------------------------------------------------------|-------------------|-----------------------|
| Auth Service      | Login, users, roles, permissions                      | 8001              | 5433                  |
| Patient Service   | Patient information, addresses, contacts, insurance   | 8002              | 5434                  |
| Department Service| Department CRUD                                       | 8003              | 5435                  |
| Provider Service  | Provider/doctor and availability management           | 8004              | 5436                  |
```

Frontend development server:
```text
http://localhost:5173
```

The existing frontend Docker Compose maps:
```text
http://localhost:5100 -> Vite container port 5173
```
---

# 2. Recommended Setup Approach

For the current project, the easiest setup on a new PC is:

```text
React/Vite              -> Run locally with npm
FastAPI microservices   -> Run locally with Poetry
PostgreSQL              -> Run with Docker Compose
```

This approach is recommended because the backend services communicate with each other using `localhost` URLs from the shared backend `.env`.
Running each backend service in its current individual Docker Compose project would place the services on different Docker networks. Also, `localhost` inside a container refers to that container itself, not another service. Therefore, the local-development approach below avoids unnecessary networking changes.

---

# 3. Prerequisites
Install the following software on the new PC.

## Required
- Git
- Python 3.10+
- Poetry 2.x
- Node.js 22+
- npm 10+
- Docker
- Docker Compose

Verify:
```bash
git --version
python3 --version
poetry --version
node -v
npm -v
docker --version
docker compose version
```

The project `pyproject.toml` files require Python:
```text
>=3.10,<4.0
```

Node.js 22+ is recommended because the frontend Dockerfile uses Node 22 and the existing frontend setup was created around Node 22.

---

# 4. Important Environment Files
The project uses environment files in these locations:

```text
backend/.env

backend/auth_service/.env
backend/patient_service/.env
backend/department_service/.env
backend/provider_service/.env

frontend/.env
```

If `.env` files are not committed to Git in your actual repository, create them from your team's secure environment configuration.
**Do not commit production secrets, database passwords, or JWT secrets to a public Git repository.**

---

# 5. Backend Environment Configuration
## 5.1 Common Backend Environment
File:
```text
backend/.env
```

For local development, use values similar to:
```env
JWT_SECRET_KEY="<GENERATE-A-NEW-SECRET-FOR-THE-NEW-ENVIRONMENT>"
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=90
JWT_TOKEN_URL="/auth/login"

AUTH_SERVICE_URL="http://localhost:8001"
PATIENT_SERVICE_URL="http://localhost:8002"
DEPARTMENT_SERVICE_URL="http://localhost:8003"
PROVIDER_SERVICE_URL="http://localhost:8004"
```
The important point is that the service URLs must point to the ports on which the FastAPI services are running.

---

# 6. PostgreSQL Databases
Each microservice currently has its own PostgreSQL database.
```bash
| Service   | Database              | Host Port |
|-----------|-----------------------|----------:|
| Auth      | auth_service_db       | 5433      |
| Patient   | patient_service_db    | 5434      |
| Department| department_service_db | 5435      |
| Provider  | provider_service_db   | 5436      |
```
The Docker Compose files create PostgreSQL 16 containers for these databases.

---

# 7. Start PostgreSQL Databases
Open four terminals, or start each Compose project from its service directory.

## 7.1 Auth Database
```bash
cd backend/auth_service
docker compose up -d db
```

Check:
```bash
docker compose ps
```
---

## 7.2 Patient Database
Open another terminal:
```bash
cd backend/patient_service
docker compose up -d db
```

Check:
```bash
docker compose ps
```
---

## 7.3 Department Database
```bash
cd backend/department_service
docker compose up -d db
```

Check:
```bash
docker compose ps
```
---

## 7.4 Provider Database
```bash
cd backend/provider_service
docker compose up -d db
```

Check:
```bash
docker compose ps
```

You should have four PostgreSQL containers running.
Check all containers:
```bash
docker ps
```

Expected database containers:
```text
auth_service_db
patient_service_db
department_service_db
provider_service_db
```
---

# 8. Verify PostgreSQL Ports
Run:
```bash
docker ps
```

You should see mappings similar to:
```text
5433 -> 5432
5434 -> 5432
5435 -> 5432
5436 -> 5432
```

These are:
```text
localhost:5433 -> Auth PostgreSQL
localhost:5434 -> Patient PostgreSQL
localhost:5435 -> Department PostgreSQL
localhost:5436 -> Provider PostgreSQL
```
---

# 9. Change Backend Database URLs for Local Execution
The supplied Docker `.env` files currently use:
```text
@db:5432
```
That hostname works when FastAPI itself runs inside the corresponding Docker Compose network.
When FastAPI runs directly on the host PC, use `localhost` and the exposed PostgreSQL host port instead.

## Auth Service
File:
```text
backend/auth_service/.env
```

Use:

```env
DATABASE_URL="postgresql+psycopg2://postgres:<PASSWORD>@localhost:5433/auth_service_db"
DATABASE_ECHO=TRUE
```
---

## Patient Service
File:
```text
backend/patient_service/.env
```

Use:
```env
DATABASE_URL="postgresql+psycopg2://postgres:<PASSWORD>@localhost:5434/patient_service_db"
DATABASE_ECHO=TRUE
```
---

## Department Service
File:
```text
backend/department_service/.env
```

Use:
```env
DATABASE_URL="postgresql+psycopg2://postgres:<PASSWORD>@localhost:5435/department_service_db"
DATABASE_ECHO=TRUE
```
---

## Provider Service
File:
```text
backend/provider_service/.env
```

Use:
```env
DATABASE_URL="postgresql+psycopg2://postgres:<PASSWORD>@localhost:5436/provider_service_db"
DATABASE_ECHO=TRUE
```
Keep the PostgreSQL username/password consistent with the `POSTGRES_USER` and `POSTGRES_PASSWORD` values in the corresponding Compose file.

---

# 10. Install Backend Dependencies
The project already contains:
```text
pyproject.toml
poetry.lock
```

Therefore, on a new PC, do **not** run `poetry init`.
Instead, install the locked dependencies.

---

## 10.1 Auth Service
```bash
cd backend/auth_service
poetry env use python3.10
poetry install
```

Verify:
```bash
poetry run python --version
poetry show
```
---

## 10.2 Patient Service
```bash
cd backend/patient_service
poetry env use python3.10
poetry install
```

Verify:
```bash
poetry run python --version
poetry show
```
---

## 10.3 Department Service
```bash
cd backend/department_service
poetry env use python3.10
poetry install
```
---

## 10.4 Provider Service
```bash
cd backend/provider_service
poetry env use python3.10
poetry install
```
---

# 11. Start Backend Services
Because this is a microservice architecture, each service should run independently.
Use four terminals.

---

## Terminal 1 - Auth Service
```bash
cd HealthForge-FastAPI/backend/auth_service
poetry run uvicorn main:app --reload --host 0.0.0.0 --port 8001
```

API:
```text
http://localhost:8001
```

Swagger:
```text
http://localhost:8001/docs
```
---

## Terminal 2 - Patient Service
```bash
cd HealthForge-FastAPI/backend/patient_service
poetry run uvicorn main:app --reload --host 0.0.0.0 --port 8002
```

API:
```text
http://localhost:8002
```

Swagger:
```text
http://localhost:8002/docs
```
---

## Terminal 3 - Department Service
```bash
cd HealthForge-FastAPI/backend/department_service
poetry run uvicorn main:app --reload --host 0.0.0.0 --port 8003
```

API:
```text
http://localhost:8003
```

Swagger:
```text
http://localhost:8003/docs
```
---

## Terminal 4 - Provider Service
```bash
cd HealthForge-FastAPI/backend/provider_service
poetry run uvicorn main:app --reload --host 0.0.0.0 --port 8004
```

API:
```text
http://localhost:8004
```

Swagger:
```text
http://localhost:8004/docs
```
---

# 12. Database Table Creation
The current FastAPI services execute:
```python
Base.metadata.create_all(bind=engine)
```

when the application starts.
Therefore, for a fresh local database, the tables should be created automatically when the respective service starts.

For example:
```bash
poetry run uvicorn main:app --reload --port 8001
```

starts Auth Service and creates its registered SQLAlchemy tables.
Do the same for Patient, Department, and Provider services.

---

# 13. Backend Verification
Open these URLs in the browser:
```text
http://localhost:8001/docs
http://localhost:8002/docs
http://localhost:8003/docs
http://localhost:8004/docs
```
If all four Swagger pages open, the FastAPI services are running.

---

# 14. Important Backend Communication
Patient, Department, and Provider services use the shared configuration from:
```text
backend/common_service/
```

The common backend configuration should point Auth Service to:
```env
AUTH_SERVICE_URL="http://localhost:8001"
```
This is important because the other services use Auth Service for operations such as retrieving or creating users.

---

# 15. Frontend Setup
Open a new terminal.
```bash
cd HealthForge-FastAPI/frontend
```

Verify:
```bash
node -v
npm -v
```

Recommended:
```text
Node 22+
npm 10+
```
---

# 16. Install Frontend Dependencies
The project already contains:

```text
package.json
package-lock.json
```

Use:
```bash
npm ci
```

`npm ci` is preferred for a fresh setup because it installs the versions recorded in `package-lock.json`.
If `npm ci` fails because the lock file needs to be regenerated, use:
```bash
npm install
```

Do not use:
```bash
npm create vite@latest
```

because this is already an existing React/Vite project.

---

# 17. Frontend Environment
File:
```text
frontend/.env
```

For local development:
```env
VITE_AUTH_SERVICE_URL=http://localhost:8001
VITE_PATIENT_SERVICE_URL=http://localhost:8002
VITE_DEPARTMENT_SERVICE_URL=http://localhost:8003
VITE_PROVIDER_SERVICE_URL=http://localhost:8004
```
These values are used by the frontend API layer.

---

# 18. Start Frontend
From:
```text
HealthForge-FastAPI/frontend
```

run:
```bash
npm run dev
```

Vite will normally display:
```text
http://localhost:5173
```

Open:
```text
http://localhost:5173
```
---

# 19. Frontend Build Test
Before deployment, verify that the production build works:
```bash
npm run build
```

If successful, Vite creates:
```text
dist/
```

You can test the build using:
```bash
npm run preview
```
---

# 20. Complete Startup Order
For a fresh PC, use this order.

### Step 1 - Start databases
```bash
cd backend/auth_service
docker compose up -d db
```

```bash
cd ../patient_service
docker compose up -d db
```

```bash
cd ../department_service
docker compose up -d db
```

```bash
cd ../provider_service
docker compose up -d db
```

### Step 2 - Start Auth Service
```bash
cd ../auth_service
poetry run uvicorn main:app --reload --host 0.0.0.0 --port 8001
```

### Step 3 - Start Patient Service
```bash
cd ../patient_service
poetry run uvicorn main:app --reload --host 0.0.0.0 --port 8002
```

### Step 4 - Start Department Service
```bash
cd ../department_service
poetry run uvicorn main:app --reload --host 0.0.0.0 --port 8003
```

### Step 5 - Start Provider Service
```bash
cd ../provider_service
poetry run uvicorn main:app --reload --host 0.0.0.0 --port 8004
```

### Step 6 - Start React
```bash
cd ../../frontend
npm ci
npm run dev
```
---

# 21. Final URLs
## Frontend
```text
http://localhost:5173
```

## Backend
```text
Auth       http://localhost:8001
Patient    http://localhost:8002
Department http://localhost:8003
Provider   http://localhost:8004
```

## Swagger
```text
Auth       http://localhost:8001/docs
Patient    http://localhost:8002/docs
Department http://localhost:8003/docs
Provider   http://localhost:8004/docs
```
---

# 22. Login / First-Time Setup
The Auth Service manages:
- Users
- Roles
- Permissions
- User-role relationships
- Authentication
- JWT access tokens

Before testing the frontend login, make sure the required user/role data exists in the Auth database.
Check the Auth Service Swagger:
```text
http://localhost:8001/docs
```

Use the available Auth/User/Role APIs to create or configure the required development user.
If your actual project repository contains a seed script, run that seed script before logging in.

---

# 23. Testing Frontend + Backend
After all services are running:
1. Open:
```text
http://localhost:5173
```

2. Login using a valid Auth Service user.
3. Verify that the JWT access token is stored by the frontend.
4. Open Patient pages.
5. Test:
   - Patient list
   - Add Patient
   - Edit Patient
   - View Patient
   - Delete Patient
   - Patient addresses
   - Patient contacts
   - Patient insurance

6. Test Provider pages.
7. Test:
   - Provider list
   - Add Provider
   - Edit Provider
   - Provider dashboard
   - Provider availability

8. Test Department pages.
9. Test Appointment functionality after the required Provider/Department data exists.
---

# 24. Clean New-PC Setup - Short Version
If you already understand the detailed steps above, the complete setup is:

```bash
# 1. Enter project
cd HealthForge-FastAPI

# 2. Start PostgreSQL databases
cd backend/auth_service
docker compose up -d db

cd ../patient_service
docker compose up -d db

cd ../department_service
docker compose up -d db

cd ../provider_service
docker compose up -d db
```

Install backend dependencies:
```bash
cd ../auth_service
poetry env use python3.10
poetry install

cd ../patient_service
poetry env use python3.10
poetry install

cd ../department_service
poetry env use python3.10
poetry install

cd ../provider_service
poetry env use python3.10
poetry install
```

Start backend services in four terminals:
```bash
cd backend/auth_service
poetry run uvicorn main:app --reload --host 0.0.0.0 --port 8001
```

```bash
cd backend/patient_service
poetry run uvicorn main:app --reload --host 0.0.0.0 --port 8002
```

```bash
cd backend/department_service
poetry run uvicorn main:app --reload --host 0.0.0.0 --port 8003
```

```bash
cd backend/provider_service
poetry run uvicorn main:app --reload --host 0.0.0.0 --port 8004
```

Start frontend:
```bash
cd frontend
npm ci
npm run dev
```

Open:
```text
http://localhost:5173
```
---
