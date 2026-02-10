1️⃣ Define Services (FINAL, LOCKED)

We confirm what each service is responsible for.
No overlaps. No confusion.

Auth Service (4001)

Responsibility

Signup

Login

Token generation

Token refresh

Logout (token invalidation)

NOT responsible for

User profile data

Addresses

Orders

User Service (4002)

Responsibility

User profile

Addresses

Preferences

Restaurant Service (4003)

Responsibility

Restaurant details

Menu

Availability

Pricing

Order Service (4004)

Responsibility

Cart

Order creation

Order lifecycle

Status changes

🔒 Rule:
Each service owns its data.
No other service writes to it.

2️⃣ Authentication Strategy (VERY IMPORTANT)

We use JWT-based authentication, but done properly.

Tokens

Access Token

Short-lived (15 min)

Used on every API request

Refresh Token

Long-lived (7–14 days)

Used only to get new access token

Token Flow (User Login)

User sends email + password → Auth Service

Auth Service verifies credentials

Auth Service returns:

Access Token

Refresh Token

Frontend stores:

Access token → memory

Refresh token → httpOnly cookie (later)

API Request Flow
Frontend → API Gateway → Service
          Authorization: Bearer <access_token>


Each service:

Verifies JWT

Extracts userId and role

3️⃣ JWT Payload (DESIGN THIS NOW)

Access Token payload:

{
  "userId": "uuid",
  "role": "USER | RESTAURANT | ADMIN",
  "iat": 123456,
  "exp": 123999
}


This is enough.
Do NOT overload JWT.

4️⃣ Database Choice (FINAL)
Auth Service

PostgreSQL

Tables:

users_auth

refresh_tokens

Why?

Transactions

Security

Consistency

User Service

PostgreSQL

Tables:

users_profile

addresses

Restaurant Service

MongoDB

Collections:

restaurants

menus

Why?

Flexible menu structure

Frequent changes

Order Service

PostgreSQL

Tables:

orders

order_items

5️⃣ API Contracts (NO CODING YET)
Auth Service APIs
Method	Endpoint	Description
POST	/auth/signup	Create user
POST	/auth/login	Login
POST	/auth/refresh	New access token
POST	/auth/logout	Logout
User Service APIs
Method	Endpoint
GET	/users/me
PUT	/users/me
POST	/users/address
Restaurant Service APIs
Method	Endpoint
GET	/restaurants
GET	/restaurants/:id
GET	/restaurants/:id/menu
Order Service APIs
Method	Endpoint
POST	/orders
GET	/orders/:id
GET	/orders/user