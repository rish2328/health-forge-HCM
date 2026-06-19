# Patient Service API Documentation

## Base URL
```http
http://localhost:8002
```
---

# Authentication
All endpoints require a valid JWT access token.

### Header
```http
Authorization: Bearer <auth-logged-in-token>
```
---

# Patient APIs

## 1. Get All Patients
Retrieve all patients.

### Request
```http
GET /patient
```
### Example
```http
GET http://localhost:8002/patient
```
---

## 2. Get Patient By UUID
Retrieve a specific patient by UUID.

### Request
```http
GET /patient/{patient_uuid}
```
### Example
```http
GET http://localhost:8002/patient/6c10d3be-12356-43dd-7896-3fc90a768afb
```
### Path Parameters
| Parameter    | Type | Description               |
| ------------ | ---- | ------------------------- |
| patient_uuid | UUID | Patient unique identifier |
---

## 3. Create Patient
Create a new patient record.

### Request
```http
POST /patient
```
### Request Body
```json
{
    "first_name": "test",
    "middle_name": "dot",
    "last_name": "cis",
    "gender": "Male",
    "dob": "2005-10-27",
    "blood_group": "AB+",
    "marital_status": "Married",
    "email": "altab.aslam@mailinator.com",
    "phone": "6985231047"
}
```
---

## 4. Update Patient
Update an existing patient.

### Request
```http
PUT /patient/{patient_uuid}
```
### Example
```http
PUT http://localhost:8002/patient/6c10d3be-12356-43dd-7896-3fc90a768afb
```
### Request Body
```json
{
    "first_name": "test",
    "middle_name": "dot",
    "last_name": "cis",
    "gender": "Male",
    "dob": "2005-10-27",
    "blood_group": "AB+",
    "marital_status": "Married",
    "email": "altab.aslam@mailinator.com",
    "phone": "6985231047"
}
```
---

## 5. Delete Patient
Delete a patient by UUID.

### Request
```http
DELETE /patient/{patient_uuid}
```
### Example
```http
DELETE http://localhost:8002/patient/6c10d3be-12356-43dd-7896-3fc90a768afb
```
---

# Patient Address APIs

## 1. Get All Addresses of a Patient
Retrieve all addresses associated with a patient.

### Request
```http
GET /patient/address/{patient_uuid}
```
### Example
```http
GET http://localhost:8002/patient/address/6c10d3be-12356-43dd-7896-3fc90a768afb
```
### Path Parameters
| Parameter    | Type | Description               |
| ------------ | ---- | ------------------------- |
| patient_uuid | UUID | Patient unique identifier |
---

## 2. Get Address By Address ID
Retrieve a specific address of a patient.

### Request
```http
GET /patient/address/{address_id}/{patient_uuid}
```
### Example
```http
GET http://localhost:8002/patient/address/1/6c10d3be-12356-43dd-7896-3fc90a768afb
```
### Path Parameters
| Parameter    | Type    | Description  |
| ------------ | ------- | ------------ |
| address_id   | Integer | Address ID   |
| patient_uuid | UUID    | Patient UUID |
---

## 3. Create Address
Create a new patient address.

### Request
```http
POST /patient/address
```
### Request Body
```json
{
    "patient_uuid": "6c10d3be-12356-43dd-7896-3fc90a768afb",
    "address_line_1": "C/O Sarah Johnson",
    "address_line_2": "18 Oxford Street",
    "city": "London",
    "state": "Greater London",
    "country": "United Kingdom",
    "postal_code": "W1D 1BS",
    "address_type": "Emergency Contact"
}
```
---

## 4. Update Address
Update an existing patient address.

### Request
```http
PUT /patient/address/{address_id}/{patient_uuid}
```
### Example
```http
PUT http://localhost:8002/patient/address/1/6c10d3be-12356-43dd-7896-3fc90a768afb
```
### Request Body
```json
{
    "patient_uuid": "6c10d3be-12356-43dd-7896-3fc90a768afb",
    "address_line_1": "W/O Sarah Johnson",
    "address_line_2": "20 Oxford Street",
    "city": "London",
    "state": "Greater London",
    "country": "United Kingdom",
    "postal_code": "W1D 1BS",
    "address_type": "Emergency Contact"
}
```
---

## 5. Delete Address
Delete a patient address.

### Request
```http
DELETE /patient/address/{address_id}/{patient_uuid}
```
### Example
```http
DELETE http://localhost:8002/patient/address/1/6c10d3be-12356-43dd-7896-3fc90a768afb
```
---

# Patient Contact APIs

## 1. Get All Contacts of a Patient
Retrieve all contacts associated with a patient.

### Request
```http
GET /patient/contact/{patient_uuid}
```
### Example
```http
GET http://localhost:8002/patient/contact/6c10d3be-12356-43dd-7896-3fc90a768afb
```
### Path Parameters
| Parameter    | Type | Description               |
| ------------ | ---- | ------------------------- |
| patient_uuid | UUID | Patient unique identifier |
---

## 2. Get Contact By Contact ID
Retrieve a specific contact of a patient.

### Request
```http
GET /patient/contact/{contact_id}/{patient_uuid}
```
### Example
```http
GET http://localhost:8002/patient/contact/1/6c10d3be-12356-43dd-7896-3fc90a768afb
```
### Path Parameters
| Parameter    | Type    | Description  |
| ------------ | ------- |--------------|
| contact_id   | Integer | Contact ID   |
| patient_uuid | UUID    | Patient UUID |
---

## 3. Create Contact
Create a new patient contact.

### Request
```http
POST /patient/contact
```
### Request Body
```json
{
    "patient_uuid": "6c10d3be-12356-43dd-7896-3fc90a768afb",
    "name": "Thomas Johnson",
    "relation": "father",
    "phone": "9874563210",
    "email": "test.patient@mailinator.com",
    "is_emergency_contact": 1
}
```
---

## 4. Update Contact
Update an existing patient contact.

### Request
```http
PUT /patient/contact/{contact_id}/{patient_uuid}
```
### Example
```http
PUT http://localhost:8002/patient/contact/1/6c10d3be-12356-43dd-7896-3fc90a768afb
```
### Request Body
```json
{
    "patient_uuid": "6c10d3be-12356-43dd-7896-3fc90a768afb",
    "name": "Thomas Johnson",
    "relation": "father",
    "phone": "9874563210",
    "email": "test.patient@mailinator.com",
    "is_emergency_contact": 1
}
```
---

## 5. Delete Contact
Delete a patient contact.

### Request
```http
DELETE /patient/contact/{contact_id}/{patient_uuid}
```
### Example
```http
DELETE http://localhost:8002/patient/contact/1/6c10d3be-12356-43dd-7896-3fc90a768afb
```
---

# Patient Insurance APIs

## 1. Get All Insurance of a Patient
Retrieve all insurance associated with a patient.

### Request
```http
GET /patient/insurance/{patient_uuid}
```
### Example
```http
GET http://localhost:8002/patient/insurance/6c10d3be-12356-43dd-7896-3fc90a768afb
```
### Path Parameters
| Parameter    | Type | Description               |
| ------------ | ---- | ------------------------- |
| patient_uuid | UUID | Patient unique identifier |
---

## 2. Get Insurance By Insurance ID
Retrieve a specific insurance of a patient.

### Request
```http
GET /patient/insurance/{insurance_id}/{patient_uuid}
```
### Example
```http
GET http://localhost:8002/patient/insurance/1/6c10d3be-12356-43dd-7896-3fc90a768afb
```
### Path Parameters
| Parameter    | Type    | Description  |
| ------------ | ------- |--------------|
| insurance_id   | Integer | Contact ID   |
| patient_uuid | UUID    | Patient UUID |
---

## 3. Create Insurance
Create a new patient insurance.

### Request
```http
POST /patient/insurance
```
### Request Body
```json
{
    "patient_uuid": "59a68dbc-8a9b-486a-b438-410f2c72a80a",
    "provider_name": "Cigna",
    "policy_number": "CIG-2026-4120",
    "group_number": "GRP-5004",
    "subscriber_name": "Test Subscriber",
    "effective_date": "2026-04-10",
    "expiry_date": "2027-04-09"
}
```
---

## 4. Update Insurance
Update an existing patient insurance.

### Request
```http
PUT /patient/insurance/{insurance_id}/{patient_uuid}
```
### Example
```http
PUT http://localhost:8002/patient/insurance/1/6c10d3be-12356-43dd-7896-3fc90a768afb
```
### Request Body
```json
{
    "patient_uuid": "59a68dbc-8a9b-486a-b438-410f2c72a80a",
    "provider_name": "Cigna Test",
    "policy_number": "CIG-2026-4120",
    "group_number": "GRP-5004",
    "subscriber_name": "Test Subscriber",
    "effective_date": "2026-04-10",
    "expiry_date": "2027-04-09"
}
```
---

## 5. Delete Insurance
Delete a patient insurance.

### Request
```http
DELETE /patient/insurance/{insurance_id}/{patient_uuid}
```
### Example
```http
DELETE http://localhost:8002/patient/insurance/1/6c10d3be-12356-43dd-7896-3fc90a768afb
```
---

