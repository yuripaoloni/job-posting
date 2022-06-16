import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import JobsController from '@/controllers/jobs.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { ApplyJobDto, DetermineJobDto, InterviewDto, JobOfferDto } from '@/dtos/jobs.dto';
import { onlyDirector, onlyManager } from '@/middlewares/permission.middleware';

class JobsRoute implements Routes {
  public path = '/jobs';
  public router = Router();
  public jobsController = new JobsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/offers/:skip`, authMiddleware, this.jobsController.getJobOffers);
    this.router.get(`${this.path}/history/:skip`, authMiddleware, this.jobsController.getJobsHistory);
    this.router.get(`${this.path}/active/:skip`, authMiddleware, this.jobsController.getActiveJobs);
    this.router.post(
      `${this.path}/offers`,
      authMiddleware,
      onlyManager,
      validationMiddleware(JobOfferDto, 'body'),
      this.jobsController.createJobOffer,
    );
    this.router.patch(
      `${this.path}/offers/:offerId`,
      authMiddleware,
      onlyManager,
      validationMiddleware(JobOfferDto, 'body'),
      this.jobsController.updateJobOffer,
    );
    this.router.delete(`${this.path}/offers/:offerId`, authMiddleware, onlyManager, this.jobsController.removeJobOffer);
    this.router.post(`${this.path}/offers/apply`, authMiddleware, validationMiddleware(ApplyJobDto, 'body'), this.jobsController.applyToJobOffer);
    this.router.delete(`${this.path}/offers/withdraw/:applicationId`, authMiddleware, this.jobsController.withdrawApplication);
    this.router.get(`${this.path}/offers/close/:offerId/:applicationId*?`, authMiddleware, onlyDirector, this.jobsController.closeOffer);
    this.router.post(
      `${this.path}/offers/determine`,
      authMiddleware,
      onlyDirector,
      validationMiddleware(DetermineJobDto, 'body'),
      this.jobsController.determineJob,
    );
    this.router.post(
      `${this.path}/interview`,
      authMiddleware,
      onlyManager,
      validationMiddleware(InterviewDto, 'body'),
      this.jobsController.sendInterviewInvite,
    );
  }
}

export default JobsRoute;
