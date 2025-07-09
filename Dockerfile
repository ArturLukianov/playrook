# Multi-stage build for Playrook application

# Stage 1: Build frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: Build backend
FROM golang:1.23-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/go.mod backend/go.sum ./
RUN go mod download
COPY backend/ ./
RUN CGO_ENABLED=1 GOOS=linux go build -a -installsuffix cgo -o playrook ./cmd/main.go

# Stage 3: Production image
FROM alpine:latest
RUN apk --no-cache add ca-certificates sqlite
WORKDIR /root/

# Copy the binary from backend-builder
COPY --from=backend-builder /app/backend/playrook .

# Copy frontend build from frontend-builder
COPY --from=frontend-builder /app/frontend/dist ./static

# Expose port
EXPOSE 8080

# Run the binary
CMD ["./playrook"] 