import cron from 'cron';
import { OffertaLavoroEntity } from '@/entities/offertaLavoro.entity';
import { logger } from '@utils/logger';
import { UtenteEntity } from '@/entities/utente.entity';
import { updateUserScores } from '@/utils/updateUserScores';

// every day at 01.00 updates user scores for job offers updated during the previous day
// such offers are indivduated with { punteggiAggiornati: false }
const updateJobOffersScores = cron.job('25 45 16 * * *', async () => {
  logger.info(`CRON JOB - updateJobOffersScores started`);
  try {
    const users = await UtenteEntity.getRepository().find({
      relations: ['competenzeLinguistiches', 'risposteUtentes', 'risposteUtentes.softSkill', 'risposteUtentes.risposta'],
    });

    const jobOffers = await OffertaLavoroEntity.getRepository().find({
      where: { punteggiAggiornati: false, approvata: true, attiva: true },
      relations: ['richiestaOfferta', 'richiestaOfferta.richiestaCompetenzeLinguistiches'],
      loadRelationIds: { relations: ['richiestaSoftSkills'] },
    });

    for (const user of users) {
      user.risposteUtentes.length > 0 && (await updateUserScores(user, jobOffers));
    }

    await OffertaLavoroEntity.getRepository().update({ punteggiAggiornati: false, approvata: true, attiva: true }, { punteggiAggiornati: true });

    logger.info(`CRON JOB - updateJobOffersScores executed`);
  } catch (err) {
    logger.info(err);
    logger.error(`CRON JOB - updateJobOffersScores: ${err?.message}`);
  }
});

export default updateJobOffersScores;
