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

# build for armv7
FROM --platform=$BUILDPLATFORM rust:1-slim-buster AS server-builder-armv7

ENV EXTRA_DEPENDENCIES="crossbuild-essential-armhf gcc-arm-linux-gnueabihf"

ENV CARGO_TARGET=armv7-unknown-linux-gnueabihf
ENV CARGO_TARGET_ARMV7_UNKNOWN_LINUX_GNUEABIHF_LINKER=/usr/bin/arm-linux-gnueabihf-gcc
ENV CARGO_OUTPUT=target/$CARGO_TARGET/release

ENV ARCH=arm
ENV MACHINE=armv7
ENV CC=arm-linux-gnueabihf-gcc

RUN rustup target add $CARGO_TARGET

# build for arm64v8
FROM --platform=$BUILDPLATFORM rust:1-slim-buster AS server-builder-arm64

ENV EXTRA_DEPENDENCIES="crossbuild-essential-arm64 gcc-aarch64-linux-gnu"

ENV CARGO_TARGET=aarch64-unknown-linux-gnu
ENV CARGO_TARGET_AARCH64_UNKNOWN_LINUX_GNU_LINKER=/usr/bin/aarch64-linux-gnu-gcc
ENV CARGO_OUTPUT=target/$CARGO_TARGET/release

ENV ARCH=aarch64
ENV MACHINE=aarch64
ENV CC=aarch64-linux-gnu-gcc

RUN rustup target add $CARGO_TARGET

# build for amd64
FROM --platform=$BUILDPLATFORM rust:1-slim-buster AS server-builder-amd64

ENV EXTRA_DEPENDENCIES="crossbuild-essential-amd64 gcc"

ENV CARGO_TARGET=x86_64-unknown-linux-gnu
ENV CARGO_OUTPUT=target/$CARGO_TARGET/release

# build everything
ARG TARGETARCH
ARG TARGETVARIANT
FROM server-builder-$TARGETARCH$TARGETVARIANT AS server-builder

ARG TARGETARCH
ENV TARGETARCH=$TARGETARCH
ARG TARGETVARIANT
ENV TARGETVARIANT=$TARGETVARIANT
ENV OPENSSL_VERSION=1.1.1d

RUN apt-get update -y \
  && apt-get install -y curl make pkg-config $EXTRA_DEPENDENCIES \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /root
RUN curl --output /root/openssl-$OPENSSL_VERSION.tar.gz https://www.openssl.org/source/openssl-$OPENSSL_VERSION.tar.gz \
  && tar xvf /root/openssl-$OPENSSL_VERSION.tar.gz \
  && rm -rf /root/openssl-$OPENSSL_VERSION.tar.gz

WORKDIR /root/openssl-$OPENSSL_VERSION
RUN ./config shared && make

ENV OPENSSL_LIB_DIR=/root/openssl-$OPENSSL_VERSION/
ENV OPENSSL_INCLUDE_DIR=/root/openssl-$OPENSSL_VERSION/include
ENV OPENSSL_STATIC=true

ENV USER=root

WORKDIR /code
RUN cargo init
COPY server/Cargo.toml /code/Cargo.toml
RUN cargo fetch

COPY server/src /code/src

RUN cargo build --release --offline --target=$CARGO_TARGET
RUN cp /code/$CARGO_OUTPUT/jolimail /jolimail

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
COPY --from=server-builder /jolimail /usr/bin/jolimail

EXPOSE 3000

ENTRYPOINT [ "/usr/bin/jolimail" ]
