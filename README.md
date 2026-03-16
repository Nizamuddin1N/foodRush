# Food Delivery Platform

A **full-stack, cloud-native food delivery platform** built using a **microservices architecture**, event-driven communication, distributed caching, CI/CD pipelines, and cloud deployment.

The platform simulates a **real-world production system similar to Zomato, Swiggy, or Uber Eats**, demonstrating scalable backend design, distributed systems patterns, and modern DevOps practices.

---

# 🏗 System Architecture

### High-Level Architecture

```
Frontend (React)
        │
        ▼
API Gateway
        │
        ▼
-------------------------------------------------
Auth Service        User Service
Restaurant Service  Order Service
Payment Service
-------------------------------------------------
        │
        ▼
Event Streaming (Kafka)
        │
        ▼
Order Status Updates
```

### Infrastructure Layer

```
AWS EC2
   │
Docker Containers
   │
----------------------------------------
AWS RDS PostgreSQL
MongoDB Atlas
Redis Cache
Kafka Event Broker
----------------------------------------
```

### CI/CD Pipeline

```
GitHub
   │
GitHub Actions
   │
Docker Hub
   │
Automatic Deployment
```

---

# 🎯 Core Features

## 👤 Authentication & Authorization

- User signup and login
- JWT-based authentication
- Refresh token strategy
- Role-based access control
- Rate limiting using Redis

---

## 🍽 Restaurant Management

Users can:

- Browse restaurants
- View menus
- Explore menu categories
- Search restaurants
- Filter restaurants

Restaurant owners can:

- Add menu items
- Update menu items
- Manage availability
- View incoming orders

---

## 🛒 Cart & Ordering

Customers can:

- Add menu items to cart
- Update quantities
- Remove items from cart
- View cart totals
- Place orders

### Order Lifecycle

```
CREATED
CONFIRMED
PREPARING
OUT_FOR_DELIVERY
DELIVERED
```

---

## 💳 Payment System

- Dedicated payment microservice
- Idempotent payment processing
- Transaction-safe payment handling
- Event-driven order confirmation

---

# ⚡ Event-Driven Architecture

The system uses **Apache Kafka** for asynchronous communication between services.

### Event Flow

```
Payment Success Event
        ↓
Kafka Topic
        ↓
Order Service Consumer
        ↓
Order Status Updated
```

### Benefits

- Decoupled microservices
- High scalability
- Fault tolerance
- Asynchronous processing

---

# 🧠 Outbox Pattern

To ensure **reliable event delivery**, the system implements the **Outbox Pattern**.

Workflow:

1. Payment transaction is stored in the database
2. Event is saved to an outbox table
3. Background worker publishes event to Kafka
4. Event is marked as processed

This ensures **exactly-once message delivery semantics**.

---

# ⚡ Distributed Caching (Redis)

Redis is used for:

- Restaurant menu caching
- Login rate limiting
- Performance optimization
- Reducing database load

---

# 🎨 Frontend Application

Built using **React + Vite**.

### Features

- Login / Signup pages
- Restaurant listing
- Menu browsing
- Add-to-cart functionality
- Cart management
- Order placement
- Payment interface
- Order history
- Order tracking

### Frontend Structure

```
src/
 ├── api/
 ├── context/
 ├── pages/
 ├── components/
 └── routes/
```

### Technologies

- React
- Axios
- React Router
- Context API
- TailwindCSS

---

# 🧩 Microservices

| Service | Responsibility |
|------|------|
| Auth Service | User authentication |
| User Service | User profiles & addresses |
| Restaurant Service | Restaurant and menu data |
| Order Service | Order lifecycle management |
| Payment Service | Payment processing |
| API Gateway | Centralized routing |

---

# 🗄 Databases

| Database | Purpose |
|------|------|
| PostgreSQL (AWS RDS) | Users, orders, payments |
| MongoDB Atlas | Restaurants and menu data |
| Redis | Caching and rate limiting |
| Kafka | Event streaming |

---

# ⚙ DevOps & Infrastructure

The platform demonstrates modern **DevOps practices**.

### Containerization

All services run inside **Docker containers**.

```
Docker
Docker Compose
```

---

### Kubernetes Deployment

Services are deployed using Kubernetes with:

- Deployments
- Services
- Health probes
- Horizontal scaling

---

### CI/CD Pipeline

Automated pipeline using:

```
GitHub Actions
Docker Hub
Kubernetes Rollouts
```

### Pipeline Workflow

1. Push code to GitHub
2. Build Docker images
3. Push images to Docker Hub
4. Deploy services to cluster

---

# ☁ Cloud Deployment

Infrastructure runs on **AWS**.

| Service | Provider |
|------|------|
| EC2 | Application hosting |
| RDS PostgreSQL | Managed relational database |
| MongoDB Atlas | Managed NoSQL database |
| Docker | Container runtime |

---

# 📦 Local Development Setup

### Clone Repository

```
git clone https://github.com/yourusername/food-delivery-platform
cd food-delivery-platform
```

### Start Backend Services

```
docker-compose up --build
```

### Run Frontend

```
cd apps/frontend/web
npm install
npm run dev
```

---

# 🌐 Environment Variables

Example backend configuration:

```
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

# 📊 System Design Highlights

This project demonstrates several advanced backend engineering concepts:

- Microservices architecture
- Event-driven communication
- Distributed caching
- Idempotent payment processing
- Outbox pattern
- CI/CD automation
- Cloud deployment
- Hybrid database architecture

---

# 📈 Scalability Considerations

The architecture supports:

- Horizontal service scaling
- Event-driven processing
- Load balancing
- Stateless services
- Database separation

---

# 🔐 Security Features

- JWT authentication
- Rate limiting
- Secure environment variables
- API gateway routing
- Role-based authorization

---

# 🧪 Example User Workflow

```
Signup
  ↓
Login
  ↓
Browse Restaurants
  ↓
View Menu
  ↓
Add to Cart
  ↓
Place Order
  ↓
Payment
  ↓
Order Confirmation
```

---

# 📚 Learning Outcomes

This project demonstrates practical knowledge of:

- Distributed systems
- Cloud architecture
- Backend scalability
- DevOps pipelines
- Full-stack development
- Event-driven design

---

# 👨‍💻 Author

**Nizamuddin**

B.Tech Computer Science Engineering  
University of Delhi — Faculty of Technology

### Interests

- Distributed Systems
- Backend Engineering
- Cloud Infrastructure
- Artificial Intelligence & Machine Learning

---

# ⭐ Final Note

This project was built to explore **real-world scalable system design**, combining backend engineering, cloud deployment, and modern DevOps practices.

It serves as a **production-style architecture demonstration** for full-stack and backend engineering roles.
