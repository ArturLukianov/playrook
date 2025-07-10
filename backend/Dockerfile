FROM golang:1.23-alpine AS builder
RUN apk add build-base

WORKDIR /app

# Copy go mod files
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build the application
RUN CGO_ENABLED=1 GOOS=linux go build -a -installsuffix cgo -o playrook ./cmd/main.go

# Production stage
FROM alpine:latest

# Install ca-certificates and sqlite
RUN apk --no-cache add ca-certificates sqlite

WORKDIR /root/

# Copy the binary from builder
COPY --from=builder /app/playrook .

# Create data directory
RUN mkdir -p /app/data

# Expose port
EXPOSE 8080

# Run the binary
CMD ["./playrook"] 