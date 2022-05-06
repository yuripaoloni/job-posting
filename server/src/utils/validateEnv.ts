import { cleanEnv, port, str } from 'envalid';

// error if any required env vars are missing or invalid
const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
  });
};

export default validateEnv;
