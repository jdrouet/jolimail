FROM --platform=$BUILDPLATFORM rust:1-slim-buster AS mrmljs

RUN apt-get update -y \
  && apt-get install -y curl libssl-dev pkg-config \
  && rm -rf /var/lib/apt/lists/*
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

WORKDIR /code
COPY packages/mrml-js /code
RUN wasm-pack build

FROM --platform=$BUILDPLATFORM node:lts-buster-slim AS client-base

COPY --from=mrmljs /code/pkg /packages/mrml-js/pkg
WORKDIR /packages/mrml-js/pkg

WORKDIR /code
COPY client/package.json client/package-lock.json /code/
RUN npm ci
COPY client /code

CMD [ "npm", "test" ]

FROM --platform=$BUILDPLATFORM client-base AS client-builder

ENV NODE_ENV=production
RUN npm run build

# fetch the vendor with the builder platform to avoid qemu issues
FROM --platform=$BUILDPLATFORM rust:1-slim-buster AS server-sources

ENV USER=root

WORKDIR /code
RUN cargo init
COPY server/Cargo.toml /code/Cargo.toml
RUN mkdir -p /code/.cargo \
  && cargo vendor > /code/.cargo/config

FROM rust:1-slim-buster AS server-builder

RUN apt-get update -y \
  && apt-get install -y curl make pkg-config libssl-dev \
  && rm -rf /var/lib/apt/lists/*

ENV USER=root

WORKDIR /code

COPY server/Cargo.toml /code/Cargo.toml
COPY server/src /code/src
COPY --from=server-sources /code/.cargo /code/.cargo
COPY --from=server-sources /code/vendor /code/vendor

RUN cargo build --release --offline

FROM debian:buster-slim

RUN apt-get update \
  && apt-get install -y ca-certificates libssl1.1 \
  && rm -rf /var/lib/apt/lists/*

ENV ADDRESS=0.0.0.0
ENV CLIENT_PATH=/client
ENV MIGRATION_PATH=/migrations
ENV PORT=3000
ENV RUST_LOG=info

COPY --from=client-builder /code/build /client
COPY server/migrations /migrations
COPY --from=server-builder /code/target/release/jolimail /usr/bin/jolimail

EXPOSE 3000

ENTRYPOINT [ "/usr/bin/jolimail" ]
