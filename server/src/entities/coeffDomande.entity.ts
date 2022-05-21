import { Index, Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { CoeffDomande } from '@/interfaces/coeffDomande.interface';

@Index('PK_coeff_domande', ['id'], { unique: true })
@Entity('coeff_domande', { schema: 'dbo' })
export class CoeffDomandeEntity extends BaseEntity implements CoeffDomande {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'ordine', nullable: true, default: () => '(70)' })
  ordine: number | null;

  @Column('int', { name: 'valore', nullable: true, default: () => '(65)' })
  valore: number | null;

  @Column('date', { name: 'data_fin', nullable: true })
  dataFin: Date | null;
}
