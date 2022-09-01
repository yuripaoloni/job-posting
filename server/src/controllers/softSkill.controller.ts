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

      res.status(200).json({
        message: `Risposte aggiornate con successo. L'aggiornamento dei punteggi di affinità potrebbe richiedere alcuni minuti.`,
        updatedAnswers,
      });

      await this.softSkillsService.updateUserJobScores(req.cf);
    } catch (error) {
      next(error);
    }
  };

  public getSoftSkills = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const softSkills = await this.softSkillsService.getSoftSkills();

      res.status(200).json(softSkills);
    } catch (error) {
      next(error);
    }
  };

  public getUserSoftSkillsAnswers = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const applicationId = Number(req.params.applicationId);

      const { softSkills, userAnswers, offerta, user } = await this.softSkillsService.getCandidateAnswersArray(applicationId);

      res.status(200).json({ softSkills, userAnswers, offerta, user });
    } catch (error) {
      next(error);
    }
  };
}

export default SoftSkillController;
