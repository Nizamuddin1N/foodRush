# 🍕 Food Delivery Platform

**A cloud-native food delivery platform built with microservices. Think Zomato or Swiggy, but engineered from scratch.**

[![GitHub](https://img.shields.io/badge/GitHub-Nizamuddin1N-181717?style=flat-square&logo=github)](https://github.com/Nizamuddin1N)
[![Node](https://img.shields.io/badge/node-20.x-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/react-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Kafka](https://img.shields.io/badge/kafka-event--driven-231F20?style=flat-square&logo=apachekafka)](https://kafka.apache.org)
[![Docker](https://img.shields.io/badge/docker-containerized-2496ED?style=flat-square&logo=docker)](https://docker.com)
[![AWS](https://img.shields.io/badge/AWS-EC2%20%2B%20RDS-FF9900?style=flat-square&logo=amazonaws)](https://aws.amazon.com)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

---

Five independent services. Two databases. One Kafka broker. Zero shared memory.

This platform simulates a production-grade food delivery system — customers browse restaurants, place orders, pay, and track delivery status in real time. Behind the scenes, each concern is a separate microservice communicating asynchronously over Kafka. Payment confirmation doesn't call the order service directly — it publishes an event, and the order service reacts. Services fail independently and recover independently.

Built to understand what distributed systems actually feel like to build, not just read about.

---

## What it actually does

- **Auth service** — JWT access + refresh token strategy, rate limiting via Redis, role-based access control
- **Restaurant service** — browse, search, filter restaurants, menu management for owners, Redis-cached menus
- **Order service** — full order lifecycle from CREATED → CONFIRMED → PREPARING → OUT_FOR_DELIVERY → DELIVERED
- **Payment service** — idempotent payment processing, transaction-safe, event-driven order confirmation
- **API gateway** — single entry point, centralized routing to all services
- **Outbox pattern** — guaranteed exactly-once Kafka event delivery even if the service crashes mid-transaction
- **Event-driven flow** — payment success publishes to Kafka topic, order service consumes and updates status asynchronously

---

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, TailwindCSS, Axios, React Router, Context API |
| Backend | Node.js, Express (per service) |
| Relational DB | PostgreSQL on AWS RDS — users, orders, payments |
| Document DB | MongoDB Atlas — restaurants and menu data |
| Cache | Redis — menu caching, rate limiting |
| Event broker | Apache Kafka — async inter-service communication |
| Containers | Docker, Docker Compose |
| Orchestration | Kubernetes — deployments, services, health probes, HPA |
| CI/CD | GitHub Actions → Docker Hub → Kubernetes rollouts |
| Cloud | AWS EC2 (compute), AWS RDS (managed PostgreSQL) |

---

## How the event-driven architecture works

This was the most interesting part to design. The naive approach is synchronous calls between services — payment calls order, order calls notification. The problem is coupling: if the order service is down, payment fails too. Every service becomes a single point of failure for every other service.

The solution is Kafka. When a payment succeeds, the payment service writes two things atomically: the payment record to PostgreSQL, and an event to an outbox table in the same transaction. A background worker polls the outbox table, publishes events to Kafka, and marks them processed. The order service has a Kafka consumer that reacts to payment events and updates order status.

If the order service is down when payment happens, the event sits in Kafka until the service recovers. No data is lost, no synchronous dependency exists between services.

This is the **Outbox Pattern** — guarantees exactly-once delivery even when services crash between writing to the DB and publishing to Kafka.

---

## System architecture
```
React Frontend
      │
      ▼
  API Gateway
      │
 ┌────┼────────────────────┐
 ▼    ▼                    ▼
Auth  Restaurant        Order + Payment
      │                    │
   MongoDB              PostgreSQL
   Redis Cache             │
                        Kafka Topic
                           │
                    Order Status Update
```

---

## Getting started locally
```bash
# Clone
git clone https://github.com/Nizamuddin1N/foodRush
cd food-delivery-platform

# Start all backend services
docker-compose up --build

# Frontend (new terminal)
cd apps/frontend/web
npm install
npm run dev
```

Open `http://localhost:5173`

---

## Environment variables
```env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=

REDIS_HOST=
KAFKA_BROKER=

MONGO_URI=
```

---

## Project structure
```
food-delivery-platform/
├── services/
│   ├── auth-service/        JWT, refresh tokens, rate limiting
│   ├── user-service/        Profiles and addresses
│   ├── restaurant-service/  Menus, search, Redis cache
│   ├── order-service/       Order lifecycle, Kafka consumer
│   ├── payment-service/     Idempotent payments, outbox pattern
│   └── api-gateway/         Centralized routing
├── apps/
│   └── frontend/web/        React + Vite + TailwindCSS
├── k8s/                     Kubernetes manifests
├── docker-compose.yml
└── .github/workflows/       CI/CD pipeline
```

---

## CI/CD pipeline

Push to main → GitHub Actions builds Docker images for each service → pushes to Docker Hub → triggers Kubernetes rolling deployment on AWS EC2. Each service deploys independently — a change to the payment service doesn't redeploy the restaurant service.

---

## Microservices breakdown

| Service | Database | Responsibility |
|---|---|---|
| Auth Service | PostgreSQL | Signup, login, JWT, refresh tokens |
| User Service | PostgreSQL | Profiles, addresses |
| Restaurant Service | MongoDB + Redis | Menus, search, caching |
| Order Service | PostgreSQL | Lifecycle management, Kafka consumer |
| Payment Service | PostgreSQL | Processing, outbox pattern |
| API Gateway | — | Routing, auth validation |

---

## Known limitations

- Kafka and Kubernetes setup requires some infrastructure knowledge to run locally — Docker Compose is the easier path for local dev
- Payment service is a simulation, not connected to a real payment provider
- No real-time delivery tracking on a map yet
  
---

*Built by [Nizamuddin](https://github.com/Nizamuddin1N)*
