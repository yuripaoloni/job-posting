import { NextFunction, Response } from 'express';
import { AuthRequest } from '@/interfaces/routes.interface';
import { JobOfferDto } from '@/dtos/jobs.dto';
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

  public getJobOffers = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const jobOffers =
        req.tipoUtenteId === WORKER
          ? await this.jobsService.getWorkerJobOffers(req.cf)
          : req.tipoUtenteId === DIRECTOR
          ? await this.jobsService.getDirectorJobOffers(req.cf)
          : await this.jobsService.getStructureJobOffers(req.cf);

      res.status(200).json(jobOffers);
    } catch (error) {
      next(error);
    }
  };

  public removeJobOffer = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const jobOfferId = Number(req.params.id);
      const jobOffer = await this.jobsService.removeJobOffer(req.cf, jobOfferId);

      res.status(200).json({ message: `Offerta di lavoro rimossa`, jobOffer });
    } catch (error) {
      next(error);
    }
  };
}

export default JobsController;
