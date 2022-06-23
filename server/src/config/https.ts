import fs from 'fs';
import { CERTIFICATE, PRIVATE_KEY } from '.';

const getHttpsConf = () => {
  const privateKey = fs.readFileSync(PRIVATE_KEY).toString();
  const certificate = fs.readFileSync(CERTIFICATE).toString();

  return {
    key: privateKey,
    cert: certificate,
  };
};

export default getHttpsConf;
