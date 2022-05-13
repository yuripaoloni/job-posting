import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { LoginDto } from '@dtos/auth.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, validationMiddleware(LoginDto, 'body'), this.authController.login);
    this.router.get(`${this.path}/validate`, authMiddleware, this.authController.validate);
  }
}

export default AuthRoute;
