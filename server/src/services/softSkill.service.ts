import { EntityRepository, Repository } from 'typeorm';
import { SoftSkillEntity } from '@entities/softSkill.entity';
import { SoftSkills } from '@/interfaces/softSkill.interface';
import { SoftSkillAnswersDto } from '@/dtos/softSkills.dto';
import { RisposteUtenteEntity } from '@/entities/risposteUtente.entity';
import { RisposteSoftSkillEntity } from '@/entities/risposteSoftSkill.entity';
import { UtenteEntity } from '@/entities/utente.entity';
import { RisposteUtente } from '@/interfaces/risposteUtente.interface';

@EntityRepository()
class SoftSkillService extends Repository<SoftSkillEntity> {
  public async getSoftSkills(): Promise<SoftSkills[]> {
    const softSkills: SoftSkills[] = await SoftSkillEntity.find({ relations: ['risposteSoftSkills'] });

    return softSkills;
  }

  public async getAnswersArray(cf: string): Promise<number[]> {
    const updatedAnswers: RisposteUtente[] = await RisposteUtenteEntity.getRepository().find({ where: { utenteCf: cf }, loadRelationIds: true });

    const answers = updatedAnswers.map(answer => answer.risposta);

    return answers;
  }

  public async updateUserAnswers(cf: string, softSkillAnswers: SoftSkillAnswersDto): Promise<RisposteUtente[]> {
    for (const [index, answer] of softSkillAnswers.answers.entries()) {
      const userAnswers = await RisposteUtenteEntity.getRepository().findOne({
        where: { utenteCf: cf, softSkill: index + 1 },
        relations: ['utenteCf', 'softSkill', 'risposta'],
      });

      const newUserAnswers = new RisposteUtenteEntity();
      const user = await UtenteEntity.getRepository().findOne({ where: { cf: cf } });
      const softSkill = await SoftSkillEntity.findOne({ where: { id: index + 1 } });
      const rispostaSoftSkill = await RisposteSoftSkillEntity.getRepository().findOne({
        where: { softSkill: index + 1, idRisposta: answer },
      });

      if (!userAnswers) {
        newUserAnswers.dataIns = new Date();
        newUserAnswers.utenteCf = user;
        newUserAnswers.softSkill = softSkill;
        newUserAnswers.risposta = rispostaSoftSkill;

        await RisposteUtenteEntity.getRepository().insert(newUserAnswers);
      } else {
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
}

export default SoftSkillService;
