RPI_CONTEXT?=rpi
TAG_NAME?=master
TARGET_PLATFORM?=linux/amd64,linux/386,linux/arm64,linux/arm/v7

all: build-client build-server

builder-local:
	docker buildx create --name local --platform ${TARGET_PLATFORM}

builder-shared:
	docker buildx create --name shared --platform ${TARGET_PLATFORM}
	docker buildx create --append --name shared --platform linux/arm/v7 ${RPI_CONTEXT}

build-client:
	docker buildx use local
	docker buildx build \
		--build-arg BUILD_TAG=${TAG_NAME} \
		--platform ${TARGET_PLATFORM} \
		--tag jdrouet/jolimail:${TAG_NAME}-client \
		--file dockerfiles/client.Dockerfile \
		--push .

build-server:
	docker buildx use shared
	docker buildx build \
		--build-arg BUILD_TAG=${TAG_NAME} \
		--platform ${TARGET_PLATFORM} \
		--tag jdrouet/jolimail:${TAG_NAME} \
		--file dockerfiles/server.Dockerfile \
		--push .
 