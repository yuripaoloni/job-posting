import { EntityRepository, IsNull, Repository } from 'typeorm';
import { CategoriaPreparazione } from '@/interfaces/categoriaPreparazione.interface';
import { CategoriaPreparazioneEntity } from '@/entities/categoriaPreparazione.entity';

@EntityRepository()
class UtilsService extends Repository<CategoriaPreparazione> {
  public async getPreparationCategories(): Promise<CategoriaPreparazione[]> {
    const categories: CategoriaPreparazione[] = await CategoriaPreparazioneEntity.find({ where: { dataFin: IsNull() } });

    return categories;
  }
}

export default UtilsService;
