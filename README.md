# Ellty MiniApp - Number Communication Test Assignment

## Project Overview

This is a one-page full-stack application implementing a number-based communication system inspired by social networks, where users interact by posting and responding with numbers and arithmetic operations. The application consists of a React + TypeScript + Vite + shadcn frontend and an Express + TypeScript backend with PostgreSQL for data storage.

### Features
- Unregistered users can browse the entire number discussion tree.
- User registration and authentication with roles management.
- Registered users can start new number chains by posting starting numbers.
- Registered users can respond by adding operations (add, sub, mul, div) with a numeric operand.
- Component-based UI provides reply trees and interaction controls.
- Backend provides RESTful APIs with authentication and role-based access.
- Database schema management via Prisma ORM, with direct schema push on startup.
- Dockerized frontend, backend, and PostgreSQL services orchestrated via Docker Compose.

***

## Docker Instructions

### Prerequisites
- Docker and Docker Compose installed.

### Environment Setup
Before starting the containers, copy the example environment files to actual `.env` files in the backend and frontend directories:

```bash
cp ellty-backend/.env.example ellty-backend/.env
cp ellty-frontend/.env.example ellty-frontend/.env
```

Edit the `.env` files as needed to configure database URLs and API endpoints.

### Build and Run Containers
At the project root, run:

```bash
docker-compose up --build
```

This command builds and starts the following containers with ports mapped as below:

- Backend accessible at [http://localhost:3000](http://localhost:3000)
- Frontend accessible at [http://localhost:5173](http://localhost:5173)
- PostgreSQL database running internally on port `5432`

***

### Docker Setup Summary

- **Frontend Dockerfile** builds the React + Vite app and serves the production build statically on port 5173 with `serve`.
- **Backend Dockerfile** installs dependencies, generates the Prisma client, builds the TypeScript project, pushes the Prisma schema to the database on startup, and then starts the Express server.
- **Database** uses the official Postgres image with volume mounted at `/var/lib/postgresql` for compatibility with Postgres 18+ Docker images.

***
