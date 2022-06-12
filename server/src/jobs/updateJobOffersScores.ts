import cron from 'cron';
import { OffertaLavoroEntity } from '@/entities/offertaLavoro.entity';
import { logger } from '@utils/logger';
import { RisposteUtenteEntity } from '@/entities/risposteUtente.entity';
import { UtenteEntity } from '@/entities/utente.entity';
import { RisposteUtente } from '@/interfaces/risposteUtente.interface';
import { CoeffDomande } from '@/interfaces/coeffDomande.interface';
import { CoeffDomandeEntity } from '@/entities/coeffDomande.entity';
import { CoeffRisposteEntity } from '@/entities/coeffRisposte.entity';
import { CoeffRisposte } from '@/interfaces/coeffRisposte.interface';
import { RichiestaSoftSkillEntity } from '@/entities/richiestaSoftSkill.entity';
import { PunteggioOffertaEntity } from '@/entities/punteggioOfferta.entity';

// every day at 01.00 updates user scores for job offers updated during the previous day
// such offers are indivduated with { punteggiAggiornati: false }
const updateJobOffersScores = cron.job('00 00 01 * * *', async () => {
  logger.info(`CRON JOB - updateJobOffersScores started`);
  try {
    // select only users that has answered soft skills questions
    const users = await UtenteEntity.getRepository()
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.risposteUtentes', 'risposteUtente')
      .where('risposteUtente.id is not null')
      .getMany();

    const jobOffers = await OffertaLavoroEntity.getRepository().find({
      where: { punteggiAggiornati: false, approvata: true, attiva: true },
      loadRelationIds: { relations: ['richiestaSoftSkills'] },
    });

    for (const user of users) {
      const userAnswers: RisposteUtente[] = await RisposteUtenteEntity.getRepository().find({ where: { utenteCf: user.cf }, loadRelationIds: true });
      const coeffDomande: CoeffDomande[] = await CoeffDomandeEntity.getRepository().find();
      const coeffRisposte: CoeffRisposte[] = await CoeffRisposteEntity.getRepository().find();

      for (const jobOffer of jobOffers) {
        let punteggio = 0;
        for (const richiestaSoftSkillId of jobOffer.richiestaSoftSkills) {
          const richiestaSoftSkill = await RichiestaSoftSkillEntity.getRepository().findOne({
            where: { id: richiestaSoftSkillId },
            loadRelationIds: { relations: ['softSkill'] },
            relations: ['rispostaRichiestaSoftSkills', 'rispostaRichiestaSoftSkills.rispostaId'],
          });

          const coeffDomanda = coeffDomande.find(item => item.ordine === richiestaSoftSkill.ordine);
          const userAnswer = userAnswers.find(item => item.softSkill === richiestaSoftSkill.softSkill);
          const rispostaRichiestaSoftSkill = richiestaSoftSkill.rispostaRichiestaSoftSkills.find(
            item => item.rispostaId.idRisposta === userAnswer.risposta,
          );
          const coeffRisposta = coeffRisposte.find(item => item.ordine === rispostaRichiestaSoftSkill.ordine);

          punteggio = punteggio + coeffDomanda.valore * coeffRisposta.valore;
        }

        let jobScore = await PunteggioOffertaEntity.getRepository().findOne({
          where: { utenteCf: user.cf, offerta: jobOffer.id },
          loadRelationIds: true,
        });

        if (!jobScore) {
          jobScore = new PunteggioOffertaEntity();

          jobScore.offerta = jobOffer;
          jobScore.utenteCf = user;
        }

        jobScore.punteggio = Math.ceil((punteggio * 100) / 525);
        jobScore.data = new Date();

        await jobScore.save();
        await OffertaLavoroEntity.getRepository().update({ id: jobOffer.id }, { punteggiAggiornati: true });
      }
    }

    logger.info(`CRON JOB - updateJobOffersScores executed`);
  } catch (err) {
    logger.log(err);
    logger.error(`CRON JOB - updateJobOffersScores: ${err?.message}`);
  }
});

export default updateJobOffersScores;
