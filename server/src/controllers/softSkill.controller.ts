import { NextFunction, Response } from 'express';
import SoftSkillService from '@/services/softSkill.service';
import { AuthRequest } from '@/interfaces/routes.interface';
import { SoftSkillAnswersDto } from '@/dtos/softSkills.dto';

class SoftSkillController {
  public softSkillsService = new SoftSkillService();

  public getSoftSkillsAndUserAnswers = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const softSkills = await this.softSkillsService.getSoftSkills();
      const userAnswers = await this.softSkillsService.getAnswersArray(req.cf);

      res.status(200).json({ softSkills, userAnswers });
    } catch (error) {
      next(error);
    }
  };

  public updateUserAnswers = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const softSkillAnswers: SoftSkillAnswersDto = req.body;

      const updatedAnswers = await this.softSkillsService.updateUserAnswers(req.cf, softSkillAnswers);

      res.status(200).json({ message: `Risposte aggiornate con successo`, updatedAnswers });
    } catch (error) {
      next(error);
    }
  };
}

export default SoftSkillController;
