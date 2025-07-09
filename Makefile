.PHONY: help install build test lint format clean docker-build docker-run dev

# Default target
help:
	@echo "Available commands:"
	@echo "  install     - Install dependencies for both frontend and backend"
	@echo "  build       - Build both frontend and backend"
	@echo "  test        - Run tests for both frontend and backend"
	@echo "  lint        - Run linting for both frontend and backend"
	@echo "  format      - Format code for both frontend and backend"
	@echo "  clean       - Clean build artifacts"
	@echo "  docker-build - Build Docker image"
	@echo "  docker-run  - Run Docker container"
	@echo "  dev         - Start development environment"

# Install dependencies
install:
	@echo "Installing frontend dependencies..."
	cd frontend && npm install
	@echo "Installing backend dependencies..."
	cd backend && go mod download

# Build both frontend and backend
build:
	@echo "Building frontend..."
	cd frontend && npm run build
	@echo "Building backend..."
	cd backend && go build -o playrook ./cmd/main.go

# Run tests
test:
	@echo "Running frontend tests..."
	cd frontend && npm test
	@echo "Running backend tests..."
	cd backend && go test -v ./...

# Run linting
lint:
	@echo "Linting frontend..."
	cd frontend && npm run lint
	@echo "Linting backend..."
	cd backend && golangci-lint run

# Format code
format:
	@echo "Formatting frontend..."
	cd frontend && npm run format
	@echo "Formatting backend..."
	cd backend && go fmt ./...
	cd backend && goimports -w .

# Clean build artifacts
clean:
	@echo "Cleaning frontend..."
	cd frontend && rm -rf dist node_modules
	@echo "Cleaning backend..."
	cd backend && rm -f playrook
	@echo "Cleaning Docker..."
	docker system prune -f

# Build Docker image
docker-build:
	@echo "Building Docker image..."
	docker build -t playrook:latest .

# Run Docker container
docker-run:
	@echo "Running Docker container..."
	docker run -p 8080:8080 playrook:latest

# Development environment
dev:
	@echo "Starting development environment..."
	docker-compose --profile dev up --build

# CI tasks
ci-install: install
ci-build: build
ci-test: test
ci-lint: lint
ci-format-check:
	@echo "Checking frontend formatting..."
	cd frontend && npx prettier --check .
	@echo "Checking backend formatting..."
	cd backend && test -z "$$(gofmt -s -l . | head -n 1)" 