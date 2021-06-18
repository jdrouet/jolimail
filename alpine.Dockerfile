FROM node:lts-buster-slim AS client-base

WORKDIR /code
COPY client/package.json client/package-lock.json /code/
RUN npm ci
COPY client /code

CMD [ "npm", "test" ]

FROM client-base AS client-builder

ENV NODE_ENV=production
RUN npm run build

FROM rust:1.52-alpine AS server-builder

RUN apk add --no-cache libc-dev

ENV USER=root

WORKDIR /code
RUN cargo init
COPY server/Cargo.toml /code/Cargo.toml
COPY server/Cargo.lock /code/Cargo.lock
RUN cargo fetch

COPY server/migrations /code/migrations
COPY server/src /code/src

RUN cargo build --release --offline

FROM alpine

LABEL org.label-schema.schema-version="1.0"
LABEL org.label-schema.docker.cmd="docker run -d -p 3000:3000 -e RUST_LOG=info -e DATABASE_HOST=localhost -e DATABASE_USER=postgres -e DATABASE_DBNAME=postgres jdrouet/jolimail"
LABEL org.label-schema.vcs-url="https://jolimail.io"
LABEL org.label-schema.url="https://github.com/jdrouet/jolimail"
LABEL org.label-schema.description="Web application providing a place to build and preview your templates"
LABEL maintaner="Jeremie Drouet <jeremie.drouet@gmail.com>"

ENV ADDRESS=0.0.0.0
ENV CLIENT_PATH=/client
ENV PORT=3000
ENV RUST_LOG=info

COPY --from=client-builder /code/build /client
COPY --from=server-builder /code/target/release/jolimail /usr/bin/jolimail

EXPOSE 3000

ENTRYPOINT [ "/usr/bin/jolimail" ]
