import { EMAIL } from '@/config';
import transporter from '@/config/mail';

const sendEmail = async (to: string[], subject: string, text: string, bcc?: string) => {
  const mailOptions = {
    from: EMAIL,
    to,
    subject,
    text,
    bcc,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
