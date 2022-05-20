import { NextFunction, Response } from 'express';
import SoftSkillService from '@/services/softSkill.service';
import { AuthRequest } from '@/interfaces/routes.interface';
import { AnswersDto } from '@/dtos/softSkills.dto';

class SoftSkillController {
  public softSkillsService = new SoftSkillService();

  public getSoftSkills = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const softSkills = await this.softSkillsService.getSoftSkills();

      res.status(200).json(softSkills);
    } catch (error) {
      next(error);
    }
  };

  public updateUserAnswers = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const answers: AnswersDto = req.body;

      await this.softSkillsService.updateUserAnswers(req.cf, answers);

      // res.status(200).json(softSkills);
    } catch (error) {
      next(error);
    }
  };
}

export default SoftSkillController;
