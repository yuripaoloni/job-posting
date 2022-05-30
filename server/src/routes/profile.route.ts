import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import ProfileController from '@/controllers/profile.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { UpdateProfileDto } from '@/dtos/profile.dto';

class ProfileRoute implements Routes {
  public path = '/profile';
  public router = Router();
  public profileController = new ProfileController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.profileController.getUserData);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(UpdateProfileDto, 'body'), this.profileController.updateProfile);
  }
}

export default ProfileRoute;
