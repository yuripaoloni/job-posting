# build stage
FROM node:14.17-alpine as common-build-stage

LABEL version="1.0"
LABEL description="Job Posting client"
LABEL maintainer = ["yuri.paoloni@studenti.unicam.it"]

COPY . ./app

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .

ENV NODE_ENV production

RUN yarn build

# caddy serve
FROM abiosoft/caddy:1.0.3 as caddy-stage

COPY Caddyfile /etc/Caddyfile
COPY --from=common-build-stage /app/build /usr/share/caddy/html