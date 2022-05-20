import { EntityRepository, Repository } from 'typeorm';
import { SoftSkillEntity } from '@entities/softSkill.entity';
import { SoftSkills } from '@/interfaces/softSkill.interface';
import { AnswersDto } from '@/dtos/softSkills.dto';

@EntityRepository()
class SoftSkillService extends Repository<SoftSkillEntity> {
  public async getSoftSkills(): Promise<SoftSkills[]> {
    const softSkills: SoftSkills[] = await SoftSkillEntity.find({ relations: ['risposteSoftSkills'] });

    return softSkills;
  }

  public async updateUserAnswers(cf: string, answers: AnswersDto): Promise<any> {}
}

export default SoftSkillService;
