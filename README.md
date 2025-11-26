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

### Build and Run Containers
At the project root, run:

```bash
docker-compose up --build
```

This command builds the `ellty-backend`, `ellty-frontend`, and `db` containers and starts them with appropriate port mappings:

- Backend exposed at [http://localhost:3000](http://localhost:3000)
- Frontend exposed at [http://localhost:5173](http://localhost:5173)
- PostgreSQL database runs internally on default port `5432`

***

### Docker Setup Summary

- **Frontend Dockerfile** builds the React + Vite app, serves the production build on port 5173 with `serve`.
- **Backend Dockerfile** installs dependencies, generates Prisma client, builds the TypeScript project, and pushes Prisma schema directly to the database on container start before launching the server.
- **Database** uses official Postgres image with volume mounted at `/var/lib/postgresql` for data compatibility with Postgres 18+ Docker images.

***
