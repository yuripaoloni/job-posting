import { EntityRepository, Repository } from 'typeorm';
import { UtenteEntity } from '@/entities/utente.entity';
import { Utente } from '@/interfaces/utente.interface';
import { UpdateProfileDto } from '@/dtos/profile.dto';
import { CompetenzeLinguisticheEntity } from '@/entities/competenzeLinguistiche.entity';

@EntityRepository()
class ProfileService extends Repository<UtenteEntity> {
  public async getUserByCf(cf: string): Promise<Utente> {
    const utente: Utente = await UtenteEntity.findOne({ where: { cf }, relations: ['competenzeLinguistiches', 'struttura'] });

    return utente;
  }

  public async updateProfile(cf: string, updateProfileData: UpdateProfileDto) {
    const user = await UtenteEntity.findOne({ where: { cf } });

    user.annoPrimaOccupazione = updateProfileData.firstOccupationYear;
    user.preparazione = updateProfileData.preparation;

    const languages = await CompetenzeLinguisticheEntity.getRepository().find({
      where: { utenteCf: cf },
      loadRelationIds: true,
    });

    const removedLanguages = languages.filter(x => !updateProfileData.languages.find(y => y.lingua === x.lingua && y.livello === x.livello));
    const addedLanguages = updateProfileData.languages.filter(x => !languages.find(y => y.lingua === x.lingua && y.livello === x.livello));

    for (const addedLanguage of addedLanguages) {
      const newLanguage = new CompetenzeLinguisticheEntity();

      newLanguage.lingua = addedLanguage.lingua;
      newLanguage.livello = addedLanguage.livello;
      newLanguage.utenteCf = user;

      await newLanguage.save();
    }

    for (const removedLanguage of removedLanguages) {
      await CompetenzeLinguisticheEntity.getRepository().delete({ id: removedLanguage.id });
    }

    await user.save();
  }
}

export default ProfileService;
