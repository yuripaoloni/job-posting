import { NextFunction, Request, Response } from 'express';
import { LoginDto } from '@dtos/auth.dto';
import AuthService from '@services/auth.service';
import { AuthRequest } from '@/interfaces/routes.interface';

class AuthController {
  public authService = new AuthService();

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const loginData: LoginDto = req.body;
      const { cookie, tipoUtenteId } = await this.authService.login(loginData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ tipoUtenteId, message: 'Accesso effettuato' });
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ message: 'logout' });
    } catch (error) {
      next(error);
    }
  };

  public validate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ tipoUtenteId: req.tipoUtenteId, username: req.username, message: 'Accesso effettuato' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
