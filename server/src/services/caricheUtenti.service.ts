import { EntityRepository, Repository } from 'typeorm';
import { CaricheUtentiEntity } from '@/entities/caricheUtenti.entity';
import { CaricheUtenti } from '@/interfaces/caricheUtenti.interface';

@EntityRepository()
class CaricheUtentiService extends Repository<CaricheUtentiEntity> {
  public async getCaricaIdByCf(cf: string): Promise<number> {
    const caricaUtente: CaricheUtenti = await CaricheUtentiEntity.findOne({
      where: { utenteCf: cf },
      loadRelationIds: true,
    });

    return caricaUtente.idTipoutente ? caricaUtente.idTipoutente : 0;
  }
}

export default CaricheUtentiService;
