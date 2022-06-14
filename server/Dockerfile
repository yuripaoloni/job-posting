# Common build stage
FROM node:14.17-alpine as common-build-stage

LABEL version="1.0"
LABEL description="Job Posting server"
LABEL maintainer = ["yuri.paoloni@studenti.unicam.it"]

COPY . ./app

WORKDIR /app

RUN yarn install

COPY . .

EXPOSE 8000

# Development build stage
FROM common-build-stage as development-build-stage

ENV NODE_ENV development

CMD ["yarn", "dev"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["yarn", "start"]