import { NextFunction, Response } from 'express';
import { AuthRequest } from '@/interfaces/routes.interface';
import { ApplyJobDto, DetermineJobDto, InterviewDto, JobOfferDto } from '@/dtos/jobs.dto';
import JobsService from '@/services/jobs.service';
import { DIRECTOR, WORKER } from '@/utils/userTypes';

class JobsController {
  public jobsService = new JobsService();

  public createJobOffer = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const jobOfferData: JobOfferDto = req.body;

      const jobOffer = await this.jobsService.createJobOffer(jobOfferData, req.cf);

      res.status(200).json({ message: `Nuova offerta di lavoro creata`, jobOffer });
    } catch (error) {
      next(error);
    }
  };

  public updateJobOffer = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const jobOfferData: JobOfferDto = req.body;
      const jobOfferId = Number(req.params.offerId);

      const jobOffer = await this.jobsService.updateJobOffer(jobOfferData, jobOfferId);

      res.status(200).json({ message: `Offerta di lavoro aggiornata`, jobOffer });
    } catch (error) {
      next(error);
    }
  };

  public getJobOffers = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const skip = Number(req.params.skip);

      const jobOffers =
        req.tipoUtenteId === WORKER
          ? await this.jobsService.getWorkerJobOffers(req.cf, skip)
          : req.tipoUtenteId === DIRECTOR
          ? await this.jobsService.getDirectorJobOffers(skip)
          : await this.jobsService.getStructureJobOffers(req.cf, skip);

      res.status(200).json(jobOffers);
    } catch (error) {
      next(error);
    }
  };

  public getActiveJobs = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const skip = Number(req.params.skip);

      const jobOffers = await this.jobsService.getDirectorActiveJobs(skip);

      res.status(200).json(jobOffers);
    } catch (error) {
      next(error);
    }
  };

  public removeJobOffer = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const jobOfferId = Number(req.params.offerId);
      const jobOffer = await this.jobsService.removeJobOffer(req.cf, jobOfferId);

      res.status(200).json({ message: `Offerta di lavoro rimossa`, jobOffer });
    } catch (error) {
      next(error);
    }
  };

  public applyToJobOffer = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const applyJobData: ApplyJobDto = req.body;
      await this.jobsService.applyToJobOffer(req.cf, applyJobData);

      res.status(200).json({ message: `Candidatura inviata`, success: true });
    } catch (error) {
      next(error);
    }
  };

  public closeOffer = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const jobOfferId = Number(req.params.offerId);
      const applicationId = req.params?.applicationId ? Number(req.params.applicationId) : null;

      await this.jobsService.closeOffer(jobOfferId, applicationId && applicationId);

      res.status(200).json({ message: `${applicationId ? 'Candidatura accettata.' : ''} Offerta lavorativa chiusa`, success: true });
    } catch (error) {
      next(error);
    }
  };

  public determineJob = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const determineJobData: DetermineJobDto = req.body;

      await this.jobsService.determineJob(determineJobData, req.cf);

      res.status(200).json({ message: `Offerta di lavoro ${determineJobData.approved ? 'approvata' : 'non approvata'}`, success: true });
    } catch (error) {
      next(error);
    }
  };

  public getJobsHistory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const skip = Number(req.params.skip);

      const jobsHistory =
        req.tipoUtenteId === WORKER
          ? await this.jobsService.getWorkerJobsHistory(req.cf, skip)
          : req.tipoUtenteId === DIRECTOR
          ? await this.jobsService.getDirectorJobsHistory(skip)
          : await this.jobsService.getStructureJobHistory(req.cf, skip);

      res.status(200).json(jobsHistory);
    } catch (error) {
      next(error);
    }
  };

  public withdrawApplication = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const applicationId = Number(req.params.applicationId);

      await this.jobsService.withdrawApplication(applicationId);

      res.status(200).json({ message: 'Candidatura annullata', success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public sendInterviewInvite = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const interviewData: InterviewDto = req.body;

      const candidaturas = await this.jobsService.sendInterviewInvite(interviewData);

      res.status(200).json({ message: 'Inviti al colloquio inviati', candidaturas });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default JobsController;
