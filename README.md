# ⚡ Flash Sale Queue System with Redis, Node.js, and Sequelize

A robust backend queue system to handle high-load flash sale purchases using Redis and Sequelize (PostgreSQL/MySQL). Supports concurrent user purchases with Redis queuing for scaling and database protection.

---

## 🚀 Features

- 🧾 Enqueue purchase requests to Redis
- 🧵 Consumer service processes each request
- 💾 Database transaction with Sequelize
- ✅ Handles concurrency and avoids over-purchasing
- ⛔ Prevents duplicate purchases per user
- 🧪 Load testing script included

---

## 🛠️ Tech Stack

- Node.js + Express
- Sequelize ORM
- PostgreSQL or MySQL
- Redis (via `ioredis`)
- TypeScript

---

## 📦 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/yourname/flash-sale-backend.git
cd flash-sale-backend
2. Install Dependencies
npm install
3. Configure Environment
