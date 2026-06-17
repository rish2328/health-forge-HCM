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
