# build stage
FROM node:14.17-alpine as common-build-stage

LABEL version="1.0"
LABEL description="Job Posting client"
LABEL maintainer = ["yuri.paoloni@studenti.unicam.it"]

COPY . ./app

WORKDIR /app

RUN yarn install

COPY . .

ENV NODE_ENV production

RUN yarn build

# caddy serve
FROM abiosoft/caddy:1.0.3 as caddy-stage

COPY conf/Caddyfile /etc/Caddyfile
COPY --from=builder /app/build /usr/share/caddy/html