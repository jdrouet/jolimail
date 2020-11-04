dev-run:
	RUST_LOG=debug MIGRATION_PATH=./migrations DATABASE_HOST=localhost DATABASE_USER=postgres DATABASE_DBNAME=postgres PORT=3001 cargo run

dev-test:
	MIGRATION_PATH=./migrations DATABASE_HOST=localhost DATABASE_USER=postgres DATABASE_DBNAME=postgres cargo test

lint:
	rustfmt --edition 2018 --check src/*.rs

test:
	cargo test
