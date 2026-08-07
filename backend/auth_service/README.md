# Auth Service API Documentation

## Base URL
```http
http://localhost:8001
```
---

# Authentication
All endpoints require a valid JWT access token.

### Header
```http
Authorization: Bearer <auth-logged-in-token>
```
---

# Login APIs
## 1. Login
Login into the system.

### Request
```http
POST /auth/login
```
### Request Body
```json
{
    "email": "test.xyz@example.com",
    "password": "12345678"
}
```
---