import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('coeff_domande', { schema: 'dbo' })
export class CoeffDomandeEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'ordine', nullable: true, default: () => '(70)' })
  ordine: number | null;

  @Column('int', { name: 'valore', nullable: true, default: () => '(65)' })
  valore: number | null;

  @Column('date', { name: 'data_fin', nullable: true })
  dataFin: Date | null;
}