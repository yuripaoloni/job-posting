import { NextFunction, Response } from 'express';
import { AuthRequest } from '@/interfaces/routes.interface';
import ProfileService from '@/services/profile.service';
import { UpdateProfileDto } from '@/dtos/profile.dto';

class ProfileController {
  public profileService = new ProfileService();

  public getUserData = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const utente = await this.profileService.getUserByCf(req.cf);

      res.status(200).json(utente);
    } catch (error) {
      next(error);
    }
  };

  public updateProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const updateProfileData: UpdateProfileDto = req.body;

      await this.profileService.updateProfile(req.cf, updateProfileData);

      res.status(200).json({ message: 'Profilo aggiornato', success: true });
    } catch (error) {
      next(error);
    }
  };
}

export default ProfileController;
