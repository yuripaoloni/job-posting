import cron from 'cron';
import { OffertaLavoroEntity } from '@/entities/offertaLavoro.entity';
import { LessThan } from 'typeorm';
import { logger } from '@utils/logger';

// everyday at 23:58. Set { attiva: false } on expired job offers
const expiredJobOffers = cron.job('23 58 00 * * *', async () => {
  try {
    await OffertaLavoroEntity.getRepository().update({ dataScadenza: LessThan(new Date()) }, { attiva: false });
    logger.info(`CRON JOB - expiredJobOffers executed`);
  } catch (err) {
    logger.log(err);
    logger.error(`CRON JOB - expiredJobOffers: ${err?.message}`);
  }
});

export default expiredJobOffers;
