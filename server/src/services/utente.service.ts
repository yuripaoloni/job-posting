import { EntityRepository, Repository } from 'typeorm';
import { UtenteEntity } from '@/entities/utente.entity';
import { HttpException } from '@/exceptions/HttpException';
import { Utente } from '@/interfaces/utente.interface';

@EntityRepository()
class UtenteService extends Repository<UtenteEntity> {
  public async findUserByCf(cf: string): Promise<Utente> {
    const utente: Utente = await UtenteEntity.findOne({ where: { cf } });

    if (!utente) throw new HttpException(401, `Utente ${cf} non registrato`);

    return utente;
  }
}

export default UtenteService;
