node_modules:
	npm install

build: node_modules
	npm run build

test: node_modules
	npm test

lint: node_modules
	npm run lint

ci-coverage: node_modules
	CI=true npm run test -- --coverage
	curl -s https://codecov.io/bash | bash
