import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  LDAP_SERVER,
  EMAIL,
  EMAIL_PWD,
  EMAIL_DOMAIN,
  DG_EMAIL,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  PRIVATE_KEY,
  CERTIFICATE,
} = process.env;
