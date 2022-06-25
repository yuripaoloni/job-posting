# Job Posting

## Development

To start the client add a `.env.local` file with the content below, install deps with `yarn install` and run `yarn start`. Client will start at [localhost:3000](localhost:3000)

```env
REACT_APP_API_URL=https://<server_url>:<port>/api
```

To start the server add a `.env.development.local` with the following content:

```env
# PORT
PORT =

# DATABASE
DB_HOST =
DB_PORT =
DB_USER =
DB_PASSWORD =
DB_DATABASE =

# LDAP
LDAP_SERVER =

# EMAIL
EMAIL =
EMAIL_PWD =
EMAIL_DOMAIN =
DG_EMAIL =

# TOKEN
SECRET_KEY =

# LOG
LOG_FORMAT = combined
LOG_DIR = ../logs

# CORS
ORIGIN =
CREDENTIALS = true
```

Then, run `yarn install` and `yarn dev` to start the server on [localhost:8000](localhost:8000).

The `nodemon.json` file contains the configuration for [nodemon](https://nodemon.io/) in development.

## Deploy

### Deploy client

Add inside `.env.production.local` the server path:

```env
REACT_APP_API_URL=https://<server_url>:<port>/api
```

Install dependencies with `yarn install` and run `yarn build`. A `/build` folder will be created with all the bundled content.

### Deploy server

Add a `.env.production.local` file with the following content:

```env
# PORT
PORT =

# DATABASE
DB_HOST =
DB_PORT =
DB_USER =
DB_PASSWORD =
DB_DATABASE =

# LDAP
LDAP_SERVER =

# EMAIL
EMAIL =
EMAIL_PWD =
EMAIL_DOMAIN =
DG_EMAIL =

# TOKEN
SECRET_KEY =

# LOG
LOG_FORMAT = combined
LOG_DIR = ../logs

# CORS
ORIGIN =
CREDENTIALS = true

# HTTPS
PRIVATE_KEY =
CERTIFICATE =
```

Install dependencies with `yarn install` and deploy the server with `yarn deploy:prod`.

The `ecosystem.config.js` file contains the configuration for [PM2](https://pm2.keymetrics.io/) to manage the running processes.

## API documentation

Server API documentation is accessible at [https://jobposting.unicam.it:8000/api-docs/](https://jobposting.unicam.it:8000/api-docs/).

In local development is accessible at [http://localhost:8000/api-docs](http://localhost:8000/api-docs).
