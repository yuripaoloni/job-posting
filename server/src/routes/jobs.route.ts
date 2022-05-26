import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import JobsController from '@/controllers/jobs.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { ApplyJobDto, JobOfferDto } from '@/dtos/jobs.dto';
import { onlyManager } from '@/middlewares/permission.middleware';

class JobsRoute implements Routes {
  public path = '/jobs';
  public router = Router();
  public jobsController = new JobsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/offers`, authMiddleware, this.jobsController.getJobOffers);
    this.router.post(
      `${this.path}/offers`,
      authMiddleware,
      onlyManager,
      validationMiddleware(JobOfferDto, 'body'),
      this.jobsController.createJobOffer,
    );
    this.router.delete(`${this.path}/offers/:id`, authMiddleware, onlyManager, this.jobsController.removeJobOffer);
    this.router.post(`${this.path}/offers/apply`, authMiddleware, validationMiddleware(ApplyJobDto, 'body'), this.jobsController.applyToJobOffer);
    this.router.get(`${this.path}/offers/accept/:applicationId`, authMiddleware, onlyManager, this.jobsController.acceptApplication);
  }
}

export default JobsRoute;
