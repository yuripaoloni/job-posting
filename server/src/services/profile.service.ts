import { EntityRepository, Repository } from 'typeorm';
import { UtenteEntity } from '@/entities/utente.entity';
import { Utente } from '@/interfaces/utente.interface';

@EntityRepository()
class ProfileService extends Repository<UtenteEntity> {
  public async getUserByCf(cf: string): Promise<Utente> {
    const utente: Utente = await UtenteEntity.findOne({ where: { cf }, relations: ['competenzeLinguistiches', 'struttura'] });

    return utente;
  }
}

export default ProfileService;
