import cron from 'cron';
import { logger } from '@utils/logger';
import { OffertaLavoroEntity } from '@/entities/offertaLavoro.entity';
import { RisposteUtenteEntity } from '@/entities/risposteUtente.entity';
import sendEmail from '@/utils/mail';

// everyday at 08:00. Notify users about the new approved positions
const notifyUsers = cron.job('00 00 08 * * *', async () => {
  logger.info(`CRON JOB - notifyUsers started`);
  try {
    const yesterday = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    yesterday.setDate(yesterday.getDate() - 1);

    const jobs = await OffertaLavoroEntity.getRepository().find({ where: { dataApprovazione: yesterday } });

    const userAnswers = await RisposteUtenteEntity.getRepository()
      .createQueryBuilder('answers')
      .leftJoinAndSelect('answers.utenteCf', 'user')
      .getMany();
    const uniqueUsersEmail = Array.from(new Set(userAnswers.map(a => a.utenteCf.cf)))
      .map(cf => userAnswers.find(a => a.utenteCf.cf === cf))
      .map(a => a.utenteCf.email);

    for (const job of jobs) {
      await sendEmail(
        uniqueUsersEmail,
        `Nuova posizione lavorativa - ${job.ruolo}`,
        `Una nuova posizione di "${job.ruolo}" per "${job.struttura}" è stata aperta il ${new Date(job.dataCreazione).toLocaleDateString(
          'it-IT',
        )}.\n\nCordiali saluti`,
      );

      logger.info(`CRON JOB - notifyUsers: sent email for ${job.ruolo} - ${job.struttura} (${job.id})`);
    }

    logger.info(`CRON JOB - notifyUsers executed`);
  } catch (err) {
    logger.log(err);
    logger.error(`CRON JOB - notifyUsers: ${err?.message}`);
  }
});

export default notifyUsers;
