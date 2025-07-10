# Deployment Guide

## Environment Setup

### Frontend Environment Variables

Create a `.env` file in the frontend directory:

```bash
VITE_API_BASE_URL=http://localhost/api
```

For production, this should be:
```bash
VITE_API_BASE_URL=/api
```

## Development

### With Nginx Proxy (Recommended)

```bash
make dev
```

This starts:
- Frontend on http://localhost (port 80)
- Backend API on http://localhost/api
- Nginx proxy handling routing

### Without Nginx (Direct Access)

```bash
make dev-direct
```

This starts:
- Frontend on http://localhost:3000
- Backend on http://localhost:8080

## Production

### Using Docker Compose

```bash
make prod
```

Or in background:
```bash
make prod-daemon
```

### Using Docker

```bash
# Build and run the production image
docker build -t playrook .
docker run -p 8080:8080 playrook
```

## Architecture

### Development Setup
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Browser   │───▶│    Nginx    │───▶│  Frontend   │
│             │    │   (Port 80) │    │ (Port 3000) │
└─────────────┘    └─────────────┘    └─────────────┘
                          │
                          ▼
                   ┌─────────────┐
                   │   Backend   │
                   │ (Port 8080) │
                   └─────────────┘
```

### Production Setup
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Browser   │───▶│    Nginx    │───▶│  Frontend   │
│             │    │   (Port 80) │    │ (Port 80)   │
└─────────────┘    └─────────────┘    └─────────────┘
                          │
                          ▼
                   ┌─────────────┐
                   │   Backend   │
                   │ (Port 8080) │
                   └─────────────┘
```

## API Routing

- All requests to `/api/*` are proxied to the backend
- All other requests are served by the frontend
- CORS is handled by nginx for development
- Static assets are cached appropriately

## Environment Variables

| Variable | Development | Production | Description |
|----------|-------------|------------|-------------|
| `VITE_API_BASE_URL` | `http://localhost/api` | `/api` | API endpoint URL |
| `GIN_MODE` | `debug` | `release` | Go server mode | 