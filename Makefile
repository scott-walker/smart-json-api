.SILENT:
include .env

# Docker compose up
up: 
	docker compose up -d --build

# Docker compose down
down: 
	docker compose down --remove-orphans

# Generate SSL certificate
generate-ssl:
	mkdir -p gateway/ssl
	mkcert -key-file gateway/ssl/$(GATEWAY_FRONT_SERVER_NAME).key -cert-file gateway/ssl/$(GATEWAY_FRONT_SERVER_NAME).cert $(GATEWAY_FRONT_SERVER_NAME) 127.0.0.1 ::1
	mkcert -key-file gateway/ssl/$(GATEWAY_API_SERVER_NAME).key -cert-file gateway/ssl/$(GATEWAY_API_SERVER_NAME).cert $(GATEWAY_API_SERVER_NAME) 127.0.0.1 ::1
	echo "SSL certificate created in gateway/ssl/"

# Add host to /etc/hosts
add-hosts:
	echo "\n# DockerStarter generated hosts" | sudo tee -a /etc/hosts
	echo "127.0.0.1 ${GATEWAY_FRONT_SERVER_NAME} $(GATEWAY_API_SERVER_NAME)" | sudo tee -a /etc/hosts
	echo "::1 ${GATEWAY_FRONT_SERVER_NAME} $(GATEWAY_API_SERVER_NAME)" | sudo tee -a /etc/hosts

# Build GATEWAY image
build-gateway:
	docker build \
		-t $(PROJECT_NAME)-gateway \
		-f $(PWD)/gateway/.docker/Dockerfile \
		./gateway

# Build API image
build-api:
	docker build -t \
		$(PROJECT_NAME)-api \
		-f $(PWD)/api/.docker/Dockerfile \
		./api

# Build FRONT image PROD
build-front:
	docker build \
		-t $(PROJECT_NAME)-front \
		-f $(PWD)/front/.docker/prod/Dockerfile \
		--build-arg FRONT_PORT=$(FRONT_PORT) \
		--build-arg FRONT_API_HOST=$(FRONT_API_HOST) \
		./front

# Build FRONT image DEV
build-front-dev:
	docker build \
		-t $(PROJECT_NAME)-front-dev \
		-f $(PWD)/front/.docker/dev/Dockerfile \
		./front

# Build DATABASE image
build-database:
	docker build \
		-t $(PROJECT_NAME)-database \
		-f $(PWD)/db/.docker/Dockerfile \
		./database

# Create network
create-network:
	docker network create $(PROJECT_NAME)-network

# Run GATEWAY
run-gateway:
	docker run -d \
		--name $(PROJECT_NAME)-gateway \
		--network $(PROJECT_NAME)-network \
		-p 80:80 \
		-p 443:443 \
		-e GATEWAY_API_HOST=$(GATEWAY_API_HOST) \
		-e GATEWAY_API_PORT=$(GATEWAY_API_PORT) \
		-e GATEWAY_API_SERVER_NAME=$(GATEWAY_API_SERVER_NAME) \
		-e GATEWAY_FRONT_HOST=$(GATEWAY_FRONT_HOST) \
		-e GATEWAY_FRONT_PORT=$(GATEWAY_FRONT_PORT) \
		-e GATEWAY_FRONT_SERVER_NAME=$(GATEWAY_FRONT_SERVER_NAME) \
		-v $(PWD)/gateway/ssl:/etc/nginx/ssl:ro \
		-v $(PWD)/gateway/logs:/var/log/nginx \
		$(PROJECT_NAME)-gateway
	echo "API running on https://$(GATEWAY_API_SERVER_NAME)"
	echo "FRONT running on https://$(GATEWAY_FRONT_SERVER_NAME)"

# Run API
run-api:
	docker run -d \
		--name $(PROJECT_NAME)-api \
		--network $(PROJECT_NAME)-network \
		-e PORT=$(API_PORT) \
		-e CORS_ORIGIN=$(API_CORS_ORIGIN) \
		-e API_TOKEN=$(API_AUTH_TOKEN) \
		-e AI_API_KEY=$(API_AI_KEY) \
		-e DB_CONNECTION=$(API_DB_CONNECTION) \
		$(PROJECT_NAME)-api

# Run DATABASE
run-database:
	docker run -d \
		--name $(PROJECT_NAME)-database \
		--network $(PROJECT_NAME)-network \
		-p $(DB_PORT):5432 \
		-e POSTGRES_USER=$(DB_USER) \
		-e POSTGRES_PASSWORD=$(DB_PASS) \
		-e POSTGRES_DB=$(DB_NAME) \
		$(PROJECT_NAME)-database

# Run FRONT
run-front:
	docker run -d \
		--name $(PROJECT_NAME)-front \
		--network $(PROJECT_NAME)-network \
		-e FRONT_PORT=$(FRONT_PORT) \
		-e FRONT_API_HOST=$(FRONT_API_HOST) \
		-e FRONT_API_AUTH_TOKEN=$(FRONT_API_AUTH_TOKEN) \
		$(PROJECT_NAME)-front

# Run FRONT DEV
run-front-dev:
	docker run -d \
		--name $(PROJECT_NAME)-front \
		--network $(PROJECT_NAME)-network \
		-e FRONT_PORT=$(FRONT_PORT) \
		-e FRONT_API_HOST=$(FRONT_API_HOST) \
		-e FRONT_API_AUTH_TOKEN=$(FRONT_API_AUTH_TOKEN) \
		$(PROJECT_NAME)-front-dev

# Build all
build: build-gateway build-database build-api build-front 

# Start all	
start: create-network run-database run-api run-front run-gateway 

# Stop all
stop:
	docker stop $(PROJECT_NAME)-gateway $(PROJECT_NAME)-api $(PROJECT_NAME)-front $(PROJECT_NAME)-database
	docker rm $(PROJECT_NAME)-gateway $(PROJECT_NAME)-api $(PROJECT_NAME)-front $(PROJECT_NAME)-database
	docker network rm $(PROJECT_NAME)-network

# Restart all
restart: stop start
