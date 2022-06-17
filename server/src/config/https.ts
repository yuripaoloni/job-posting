import fs from 'fs';
import { CERTIFICATE, PRIVATE_KEY } from '.';

const privateKey = fs.readFileSync(PRIVATE_KEY).toString();
const certificate = fs.readFileSync(CERTIFICATE).toString();

const httpsConf = {
  key: privateKey,
  cert: certificate,
};

export default httpsConf;
