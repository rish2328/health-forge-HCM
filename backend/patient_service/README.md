*** PATIENT SECTION API ENDPOINT ***
```
    →   Retrieve All Patient
        →   Authorization:
            →   Bearer Token: <auth-logged-in-token>
        →   Method: GET
        →   http://localhost:8002/patient

    →   Retrieve Patient By Patient UUID
        →   Authorization:
            →   Bearer Token: <auth-logged-in-token>
        →   Method: GET
        →   http://localhost:8002/patient/<patient-uuid>
                →   http://localhost:8002/patient/6c10d3be-12356-43dd-7896-3fc90a768afb

    →   Create Patient
        →   Authorization:
            →   Bearer Token: <auth-logged-in-token>
        →   Method: POST
        →   http://localhost:8002/patient
        →   raw json param:
            ```bash
                {
                  "first_name": "test",
                  "middle_name": dot,
                  "last_name": "cis",
                  "gender": "Male",
                  "dob": "2005-10-27",
                  "blood_group": "ab+",
                  "marital_status": "Married",
                  "email": "altab.aslam@mailinator.com",
                  "phone": "6985231047",
                }
            ```

    →   Update Patient
        →   Authorization:
            →   Bearer Token: <auth-logged-in-token>
        →   Method: PUT
        →   http://localhost:8002/patient/<patient-uuid>
                →   http://localhost:8002/patient/6c10d3be-12356-43dd-7896-3fc90a768afb
        →   raw json param:
            ```bash
                {
                  "first_name": "test",
                  "middle_name": dot,
                  "last_name": "cis",
                  "gender": "Male",
                  "dob": "2005-10-27",
                  "blood_group": "ab+",
                  "marital_status": "Married",
                  "email": "altab.aslam@mailinator.com",
                  "phone": "6985231047",
                }
            ```

    →   Delete Patient By Patient UUID
        →   Authorization:
            →   Bearer Token: <auth-logged-in-token>
        →   Method: DELETE
        →   http://localhost:8002/patient/<patient-uuid>
                →   http://localhost:8002/patient/6c10d3be-12356-43dd-7896-3fc90a768afb
```

*** PATIENT ADDRESS SECTION API ENDPOINT ***
```
    →   Retrieve All Addresses Of Specific Patient By Patient UUID
        →   Authorization:
            →   Bearer Token: <auth-logged-in-token>
        →   Method: GET
        →   http://localhost:8002/patient/address/<patient-uuid>
            →   http://localhost:8002/patient/address/6c10d3be-12356-43dd-7896-3fc90a768afb

    →   Retrieve Specific Address by Address ID and Patient UUID
        →   Authorization:
            →   Bearer Token: <auth-logged-in-token>
        →   Method: GET
        →   http://localhost:8002/patient/<address-id>/<patient-uuid>
                →   http://localhost:8002/patient/address/1/6c10d3be-12356-43dd-7896-3fc90a768afb

    →   Create Patient
        →   Authorization:
            →   Bearer Token: <auth-logged-in-token>
        →   Method: POST
        →   http://localhost:8002/patient/address/
        →   raw json param:
            ```bash
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

    →   Update Patient
        →   Authorization:
            →   Bearer Token: <auth-logged-in-token>
        →   Method: PUT
        →   http://localhost:8002/patient/address/<address-id>/<patient-uuid>
                →   http://localhost:8002/patient/address/1/6c10d3be-12356-43dd-7896-3fc90a768afb
        →   raw json param:
            ```bash
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

    →   Delete Patient By Patient UUID
        →   Authorization:
            →   Bearer Token: <auth-logged-in-token>
        →   Method: DELETE
        →   http://localhost:8002/patient/address/<address-id>/<patient-uuid>
                →   http://localhost:8002/patient/address/1/6c10d3be-12356-43dd-7896-3fc90a768afb
```

*** PATIENT CONTACT SECTION API ENDPOINT ***
```

```

