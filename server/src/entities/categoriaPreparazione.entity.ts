import { CategoriaPreparazione } from '@/interfaces/categoriaPreparazione.interface';
import { Index, Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Index('PK_cat_preparazione', ['id'], { unique: true })
@Entity('cat_preparazione', { schema: 'dbo' })
export class CategoriaPreparazioneEntity extends BaseEntity implements CategoriaPreparazione {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('nvarchar', { name: 'descrizione', nullable: true, length: 255 })
  descrizione: string | null;

  @Column('date', { name: 'data_fin', nullable: true })
  dataFin: Date | null;
}
