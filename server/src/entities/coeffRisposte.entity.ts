import { Index, Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { CoeffRisposte } from '@/interfaces/coeffRisposte.interface';

@Index('PK_coeff_risposte', ['id'], { unique: true })
@Entity('coeff_risposte', { schema: 'dbo' })
export class CoeffRisposteEntity extends BaseEntity implements CoeffRisposte {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'ordine', nullable: true })
  ordine: number | null;

  @Column('float', { name: 'valore', nullable: true, precision: 53 })
  valore: number | null;

  @Column('date', { name: 'data_fin', nullable: true })
  dataFin: Date | null;
}
