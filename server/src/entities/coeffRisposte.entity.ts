import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('coeff_risposte', { schema: 'dbo' })
export class CoeffRisposteEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'ordine', nullable: true })
  ordine: number | null;

  @Column('int', { name: 'valore', nullable: true })
  valore: number | null;

  @Column('date', { name: 'data_fin', nullable: true })
  dataFin: Date | null;
}
