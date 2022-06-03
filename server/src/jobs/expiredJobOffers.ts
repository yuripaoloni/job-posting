import cron from 'cron';
import { OffertaLavoroEntity } from '@/entities/offertaLavoro.entity';
import { LessThan } from 'typeorm';
import { logger } from '@utils/logger';

// everyday at 00:01
const expiredJobOffers = cron.job('00 01 00 * * *', async () => {
  try {
    await OffertaLavoroEntity.getRepository().update({ dataScadenza: LessThan(new Date()) }, { attiva: false });
    logger.info(`JOBS - expiredJobOffers executed`);
  } catch (err) {
    logger.error(`JOBS - expiredJobOffers: ${err?.message}`);
  }
});

export default expiredJobOffers;
