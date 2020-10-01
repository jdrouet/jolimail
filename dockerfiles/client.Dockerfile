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

FROM scratch

COPY --from=client-builder /code/build /static
