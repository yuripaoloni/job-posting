import { EntityRepository, Repository } from 'typeorm';
import { SoftSkillEntity } from '@entities/softSkill.entity';
import { SoftSkills } from '@/interfaces/softSkill.interface';
import { SoftSkillAnswersDto } from '@/dtos/softSkills.dto';
import { RisposteUtenteEntity } from '@/entities/risposteUtente.entity';
import { RisposteSoftSkillEntity } from '@/entities/risposteSoftSkill.entity';
import { UtenteEntity } from '@/entities/utente.entity';
import { RisposteUtente } from '@/interfaces/risposteUtente.interface';
import { CoeffDomande } from '@/interfaces/coeffDomande.interface';
import { CoeffDomandeEntity } from '@/entities/coeffDomande.entity';
import { OffertaLavoroEntity } from '@/entities/offertaLavoro.entity';
import { CoeffRisposteEntity } from '@/entities/coeffRisposte.entity';
import { CoeffRisposte } from '@/interfaces/coeffRisposte.interface';
import { RichiestaSoftSkillEntity } from '@/entities/richiestaSoftSkill.entity';
import { PunteggioOffertaEntity } from '@/entities/punteggioOfferta.entity';
import { HttpException } from '@/exceptions/HttpException';

@EntityRepository()
class SoftSkillService extends Repository<SoftSkillEntity> {
  public async getSoftSkills(): Promise<SoftSkills[]> {
    const softSkills: SoftSkills[] = await SoftSkillEntity.find({ relations: ['risposteSoftSkills'] });

    return softSkills;
  }

  public async getAnswersArray(cf: string): Promise<{ skillId: number; answerId: number }[]> {
    const updatedAnswers: RisposteUtente[] = await RisposteUtenteEntity.getRepository().find({ where: { utenteCf: cf }, loadRelationIds: true });

    const answers = updatedAnswers.map(answer => {
      return { skillId: answer.softSkill, answerId: answer.risposta };
    });

    return answers;
  }

  public async updateUserAnswers(cf: string, softSkillAnswers: SoftSkillAnswersDto): Promise<RisposteUtente[]> {
    for (const answer of softSkillAnswers.answers) {
      const userAnswers = await RisposteUtenteEntity.getRepository().findOne({
        where: { utenteCf: cf, softSkill: answer.skillId },
        relations: ['utenteCf', 'softSkill', 'risposta'],
      });

      const newUserAnswers = new RisposteUtenteEntity();
      const user = await UtenteEntity.getRepository().findOne({ where: { cf: cf } });
      const softSkill = await SoftSkillEntity.findOne({ where: { id: answer.skillId } });
      const rispostaSoftSkill = await RisposteSoftSkillEntity.getRepository().findOne({
        where: { softSkill: answer.skillId, idRisposta: answer.answerId },
      });

      if (!userAnswers) {
        newUserAnswers.dataIns = new Date();
        newUserAnswers.utenteCf = user;
        newUserAnswers.softSkill = softSkill;
        newUserAnswers.risposta = rispostaSoftSkill;

        await RisposteUtenteEntity.getRepository().insert(newUserAnswers);
      } else {
        const todayDate = new Date();

        if (new Date(userAnswers.dataIns) <= new Date(todayDate.getFullYear() + 1, todayDate.getMonth(), todayDate.getDate())) {
          throw new HttpException(403, `Risposte modificabili solo dopo un'anno. Ultimo aggiornamento ${userAnswers.dataIns}`);
        }
        if (userAnswers.risposta.idRisposta !== rispostaSoftSkill.idRisposta) {
          await RisposteUtenteEntity.getRepository().update(
            { utenteCf: user, softSkill: softSkill },
            { risposta: rispostaSoftSkill, dataIns: new Date() },
          );
        }
      }
    }

    const updatedAnswers: RisposteUtente[] = await RisposteUtenteEntity.getRepository().find({ where: { utenteCf: cf }, loadRelationIds: true });

    return updatedAnswers;
  }

  public async updateUserJobScores(cf: string): Promise<void> {
    const userAnswers: RisposteUtente[] = await RisposteUtenteEntity.getRepository().find({ where: { utenteCf: cf }, loadRelationIds: true });
    const coeffDomande: CoeffDomande[] = await CoeffDomandeEntity.getRepository().find();
    const coeffRisposte: CoeffRisposte[] = await CoeffRisposteEntity.getRepository().find();
    const jobOffers = await OffertaLavoroEntity.find({
      where: { approvata: true, attiva: true },
      order: { dataScadenza: 'DESC', dataCreazione: 'DESC' },
      loadRelationIds: { relations: ['richiestaSoftSkills'] },
    });

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

      let jobScore = await PunteggioOffertaEntity.getRepository().findOne({ where: { utenteCf: cf, offerta: jobOffer.id }, loadRelationIds: true });

      if (!jobScore) {
        jobScore = new PunteggioOffertaEntity();

        const utente = await UtenteEntity.getRepository().findOne({ where: { cf } });

        jobScore.offerta = jobOffer;
        jobScore.utenteCf = utente;
      }

      jobScore.punteggio = Math.ceil((punteggio * 100) / 525);
      jobScore.data = new Date();

      await jobScore.save();
    }
  }
}

export default SoftSkillService;
