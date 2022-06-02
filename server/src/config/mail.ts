import nodemailer from 'nodemailer';
import { EMAIL, EMAIL_PWD } from '.';

const smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: EMAIL,
    pass: EMAIL_PWD,
  },
};

const transporter = nodemailer.createTransport(smtpConfig);

export default transporter;
