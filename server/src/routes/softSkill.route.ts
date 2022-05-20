import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import SoftSkillController from '@/controllers/softSkill.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { AnswersDto } from '@/dtos/softSkills.dto';

class SoftSkillRoute implements Routes {
  public path = '/softSkills';
  public router = Router();
  public softSkillController = new SoftSkillController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.softSkillController.getSoftSkills);
    this.router.post(
      `${this.path}/user/answers`,
      authMiddleware,
      validationMiddleware(AnswersDto, 'body'),
      this.softSkillController.updateUserAnswers,
    );
  }
}

export default SoftSkillRoute;
