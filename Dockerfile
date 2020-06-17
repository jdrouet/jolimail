FROM node:lts-buster-slim AS client-builder

WORKDIR /code
COPY client/package.json client/package-lock.json /code/
RUN npm ci
COPY client /code

ENV NODE_ENV=production
RUN npm run build

FROM rust:1-slim-buster AS server-builder

ENV USER=root

WORKDIR /code
RUN cargo init
COPY server/Cargo.toml /code/Cargo.toml
RUN cargo fetch

COPY server/src /code/src

RUN cargo build --release --offline

FROM rust:1-slim-buster

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
