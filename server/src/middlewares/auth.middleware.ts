import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { UtenteEntity } from '@entities/utente.entity';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken } from '@interfaces/auth.interface';
import { AuthRequest } from '@/interfaces/routes.interface';

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const { cf, tipoUtenteId, username } = verify(Authorization, secretKey) as DataStoredInToken;
      const utente = await UtenteEntity.findOne(cf, { select: ['cf'] });

      if (utente) {
        req.tipoUtenteId = tipoUtenteId;
        req.username = username;
        req.cf = cf;
        next();
      } else {
        next(new HttpException(401, 'Token di autenticazione errato. Effettua nuovamente il login.'));
      }
    } else {
      next(new HttpException(404, 'Token di autenticazione mancante. Effettua nuovamente il login.'));
    }
  } catch (error) {
    next(new HttpException(401, 'Token di autenticazione errato. Effettua nuovamente il login.'));
  }
};

export default authMiddleware;
