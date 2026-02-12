FULL PROJECT PLAN
Online Food Ordering & Delivery Platform

PHASE 0 — FOUNDATION (Week 0)
Goal: Set strong base before writing “real” code
Deliverables
Linux environment ready (Ubuntu)
Git + GitHub workflow
Tech stack frozen
Repo created (clean structure)
Tech Decisions (Final)
Language: TypeScript everywhere
Frontend: React + Vite + TS
Backend: Node.js + Express/Fastify + TS
Architecture: Microservices
Database: PostgreSQL + MongoDB + Redis
Cloud: AWS
Containers: Docker
Orchestration: Kubernetes (EKS)
Messaging: Kafka
OS: Linux (Ubuntu)
No coding yet, only setup & understanding.

PHASE 1 — SYSTEM DESIGN (Week 1)
Goal: Think like an SDE before coding
1️⃣ High-Level Design (HLD)
You will design:
User flow
Order flow
Payment flow
Delivery flow
Event flow (Kafka)
Deliverables:
Architecture diagram
Service interaction diagram

2️⃣ Services Breakdown
Create separate services:
Auth Service
User Service
Restaurant Service
Order Service
Payment Service
Delivery Service
Notification Service
Each service:
Independent
Own database
Own Dockerfile

3️⃣ Database Design
PostgreSQL: users, orders, payments
MongoDB: restaurants, menus
Redis: cache, sessions, rate limits
Deliverables:
ER diagrams
Schema definitions

PHASE 2 — CORE BACKEND (Weeks 2–3)
Goal: Make backend production-ready
Step 1: Auth Service
JWT (access + refresh)
Password hashing
Role-based access
Token rotation
Step 2: User Service
Profile management
Address management
Step 3: Restaurant Service
Restaurant CRUD
Menu CRUD
Availability & pricing
Step 4: Order Service
Cart logic
Order creation
Order status lifecycle
Deliverables:
REST APIs
API documentation
Postman collection

PHASE 3 — FRONTEND (Weeks 4–5)
Goal: Real user-facing application
User App
Login / Signup
Browse restaurants
View menus
Cart
Place order
Track order
Restaurant Dashboard
Manage menu
Accept / reject orders
Update order status
Tech
React + TypeScript
Redux Toolkit
React Query
Protected routes
Deliverables:
Fully working UI
Connected to backend APIs

PHASE 4 — REAL-TIME & EVENTS (Week 6)
Goal: Make system dynamic and scalable
Kafka (Critical Phase)
Events:
ORDER_CREATED
PAYMENT_SUCCESS
ORDER_ACCEPTED
ORDER_DELIVERED
Consumers:
Notification service
Analytics service
Delivery service
WebSockets
Live order status
Restaurant dashboard updates
Deliverables:
Kafka topics
Producers & consumers
Socket-based updates

PHASE 5 — PAYMENTS & STORAGE (Week 7)
Goal: Enterprise realism
Payments
Stripe / Razorpay (test mode)
Webhooks
Idempotency
Retry logic
Storage
AWS S3 for images
CDN (CloudFront)
Deliverables:
Payment flow
Image upload pipeline

PHASE 6 — DEVOPS (Weeks 8–9)
Goal: Production deployment skills
Docker
Dockerfile per service
Docker Compose for local dev
Kubernetes
EKS cluster
Pods, services
ConfigMaps & Secrets
Auto-scaling
CI/CD
GitHub Actions
Build → Test → Deploy
Deliverables:
Live deployed system
CI/CD pipeline running

PHASE 7 — MONITORING & SECURITY (Week 10)
Goal: SDE maturity
Monitoring
Prometheus
Grafana
Logging
Centralized logs
Error tracking
Security
Rate limiting
Input validation
HTTPS
IAM roles
Deliverables:
Dashboards
Health checks

PHASE 8 — POLISH & INTERVIEW PREP (Week 11)
Goal: Convert project → job
Final Touches
README (architecture + screenshots)
API docs
System design explanation
Interview Prep
Explain trade-offs
Scaling discussion
Failure handling
Kafka & Kubernetes Q&A
Deliverables:
Resume-ready project
Interview confidence

