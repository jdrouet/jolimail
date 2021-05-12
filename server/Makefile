dev-run:
	RUST_LOG=debug DATABASE_URL=postgres://postgres@localhost/postgres PORT=3001 cargo run

dev-test:
	DATABASE_URL=postgres://postgres@localhost/postgres cargo test

ci-coverage:
	cargo tarpaulin --out Lcov
	curl -s https://codecov.io/bash | bash

ci-lint:
	rustfmt --edition 2018 --check src/*.rs
	rustfmt --edition 2018 --check src/**/*.rs

ci-test:
	cargo test

dev-coverage:
	DATABASE_URL=postgres://postgres@localhost/postgres cargo tarpaulin --out Lcov

dev-test:
	DATABASE_URL=postgres://postgres@localhost/postgres cargo test ${FILTER}

install-rustfmt:
	rustup component add rustfmt

install-tarpaulin:
	cargo install cargo-tarpaulin
