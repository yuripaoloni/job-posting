import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import ProfileController from '@/controllers/profile.controller';

class ProfileRoute implements Routes {
  public path = '/profile';
  public router = Router();
  public profileController = new ProfileController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.profileController.getUserData);
  }
}

export default ProfileRoute;
