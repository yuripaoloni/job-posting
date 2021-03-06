import { EntityRepository, Repository } from 'typeorm';
import { SoftSkillEntity } from '@entities/softSkill.entity';
import { SoftSkills } from '@/interfaces/softSkill.interface';
import { SoftSkillAnswersDto } from '@/dtos/softSkills.dto';
import { RisposteUtenteEntity } from '@/entities/risposteUtente.entity';
import { RisposteSoftSkillEntity } from '@/entities/risposteSoftSkill.entity';
import { UtenteEntity } from '@/entities/utente.entity';
import { RisposteUtente } from '@/interfaces/risposteUtente.interface';
import { OffertaLavoroEntity } from '@/entities/offertaLavoro.entity';
import { HttpException } from '@/exceptions/HttpException';
import { updateUserScores } from '@/utils/updateUserScores';

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
    const user = await UtenteEntity.getRepository().findOne({
      where: { cf },
      relations: ['competenzeLinguistiches', 'risposteUtentes', 'risposteUtentes.softSkill', 'risposteUtentes.risposta'],
    });
    const jobOffers = await OffertaLavoroEntity.find({
      where: { approvata: true, attiva: true },
      order: { dataScadenza: 'DESC', dataCreazione: 'DESC' },
      relations: ['richiestaOfferta', 'richiestaOfferta.richiestaCompetenzeLinguistiches'],
      loadRelationIds: { relations: ['richiestaSoftSkills'] },
    });

    await updateUserScores(user, jobOffers);
  }
}

export default SoftSkillService;
