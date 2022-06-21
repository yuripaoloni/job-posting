import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { logger } from '@utils/logger';
import { NODE_ENV } from '@/config';

// enabled on all routes for error handling in app.ts
const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message = NODE_ENV === 'production' ? 'Errore nella richiesta. Riprova.' : error.message || 'Errore nella richiesta. Riprova.';

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${error.message}`);
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
