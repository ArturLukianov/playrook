# PlayRook

A SOC Playbook Management Platform with a React (Vite) frontend and Go backend.

## Development

### Frontend (dev mode)
```sh
cd frontend
npm install
npm run dev
```

### Backend (dev mode)
```sh
cd backend
go run cmd/main.go
```

## Linting & Formatting

### Frontend
- **Lint:**
  ```sh
  cd frontend
  npm run lint
  ```
- **Format:**
  ```sh
  npm run format
  ```
- **Type check:**
  ```sh
  npx tsc --noEmit
  ```

### Backend
- **Lint:**
  ```sh
  cd backend
  golangci-lint run
  ```
- **Format:**
  ```sh
  go fmt ./...
  goimports -w .
  ```

## Running with Docker

Build and run the full stack in production mode:
```sh
docker-compose up --build
```

For local development with hot reload (requires Docker Compose v2):
```sh
docker-compose --profile dev up --build
```

## Continuous Integration (CI)

GitHub Actions will automatically:
- Lint and format check both frontend and backend
- Build and test both frontend and backend
- Build and push a Docker image to GitHub Container Registry on `main` branch pushes

## Makefile

You can use the Makefile for common tasks:
```sh
make lint        # Lint frontend and backend
make format      # Format code
make build       # Build frontend and backend
make test        # Run tests
make docker-build # Build Docker image
make docker-run  # Run Docker container
make dev         # Start development environment (Docker Compose)
```

---

For more details, see the source code and workflow files.
