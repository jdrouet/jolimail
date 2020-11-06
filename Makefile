TARGET_PLATFORM?=linux/amd64,linux/386,linux/arm64,linux/arm/v7

publish:
	docker buildx build --push \
		--file multiarch.Dockerfile \
		--platform ${TARGET_PLATFORM} \
		--tag jdrouet/jolimail:${VERSION} \
		--tag jdrouet/jolimail:latest \
		--label org.label-schema.version=${VERSION} \
		--label org.label-schema.vcs-ref=${shell git rev-parse --short HEAD} \
		.

ci-install-buildx:
	sudo rm -rf /var/lib/apt/lists/*
	curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
	sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu ${shell lsb_release -cs} edge"
	sudo apt-get update
	sudo apt-get -y -o Dpkg::Options::="--force-confnew" install docker-ce
	docker run --rm --privileged tonistiigi/binfmt:latest --install all
	mkdir -vp ~/.docker/cli-plugins/
	curl --silent -L "https://github.com/docker/buildx/releases/download/v0.4.2/buildx-v0.4.2.linux-amd64" > ~/.docker/cli-plugins/docker-buildx
	chmod a+x ~/.docker/cli-plugins/docker-buildx
	docker buildx install
	docker buildx create --use

dev-env:
	docker-compose -f docker-compose.dev.yml up -d
