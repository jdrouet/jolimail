dev-run:
	RUST_LOG=debug MIGRATION_PATH=./migrations DATABASE_HOST=localhost DATABASE_USER=postgres DATABASE_DBNAME=postgres PORT=3001 cargo run

dev-test:
	MIGRATION_PATH=./migrations DATABASE_HOST=localhost DATABASE_USER=postgres DATABASE_DBNAME=postgres cargo test

ci-coverage:
	cargo tarpaulin --out Lcov
	curl -s https://codecov.io/bash | bash

ci-lint:
	rustfmt --edition 2018 --check src/*.rs
	rustfmt --edition 2018 --check src/**/*.rs

ci-test:
	cargo test

dev-coverage:
	MIGRATION_PATH=./migrations DATABASE_HOST=localhost DATABASE_USER=postgres DATABASE_DBNAME=postgres cargo tarpaulin --out Lcov

dev-test:
	MIGRATION_PATH=./migrations DATABASE_HOST=localhost DATABASE_USER=postgres DATABASE_DBNAME=postgres cargo test

install-rustfmt:
	rustup component add rustfmt

install-tarpaulin:
	cargo install cargo-tarpaulin
