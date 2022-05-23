import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import JobsController from '@/controllers/jobs.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { JobOfferDto } from '@/dtos/jobs.dto';

class JobsRoute implements Routes {
  public path = '/jobs';
  public router = Router();
  public jobsController = new JobsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/offers`, authMiddleware, this.jobsController.getJobOffers);
    this.router.post(`${this.path}/offers`, authMiddleware, validationMiddleware(JobOfferDto, 'body'), this.jobsController.createJobOffer);
  }
}

export default JobsRoute;
