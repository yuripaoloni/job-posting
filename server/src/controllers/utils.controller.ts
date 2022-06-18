import { NextFunction, Response } from 'express';
import { AuthRequest } from '@/interfaces/routes.interface';
import { CategoriaPreparazione } from '@/interfaces/categoriaPreparazione.interface';
import UtilsService from '@/services/utils.service';

class UtilsController {
  public utilsService = new UtilsService();

  public getPreparationCategories = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categories: CategoriaPreparazione[] = await this.utilsService.getPreparationCategories();

      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  };
}

export default UtilsController;
