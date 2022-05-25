import { NextFunction, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { AuthRequest } from '@/interfaces/routes.interface';
import { DIRECTOR, MANAGER } from '@/utils/userTypes';

export const onlyDirector = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.tipoUtenteId === DIRECTOR) {
      next();
    } else {
      next(new HttpException(403, 'Accesso negato'));
    }
  } catch (error) {
    next(new HttpException(4013, 'Accesso negato'));
  }
};

export const onlyManager = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.tipoUtenteId === MANAGER) {
      next();
    } else {
      next(new HttpException(403, 'Accesso negato'));
    }
  } catch (error) {
    next(new HttpException(403, 'Accesso negato'));
  }
};
