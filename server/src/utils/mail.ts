import { EMAIL } from '@/config';
import transporter from '@/config/mail';

const sendEmail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: EMAIL,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
