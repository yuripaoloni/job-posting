import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import UtilsController from '@/controllers/utils.controller';

class UtilsRoute implements Routes {
  public path = '/utils';
  public router = Router();
  public utilsController = new UtilsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/categories`, authMiddleware, this.utilsController.getPreparationCategories);
  }
}

export default UtilsRoute;
