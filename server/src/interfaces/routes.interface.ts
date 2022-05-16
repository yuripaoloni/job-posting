import { Request, Router } from 'express';

export interface Routes {
  path?: string;
  router: Router;
}

export interface AuthRequest extends Request {
  tipoUtenteId: number;
  username: string;
}
