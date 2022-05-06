import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { UtenteEntity } from './utente.entity';
import { OffertaLavoroEntity } from './offertaLavoro.entity';

@Index('PK__candidat__3213E83F83AC25FB', ['id'], { unique: true })
@Entity('candidatura', { schema: 'dbo' })
export class CandidaturaEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('date', { name: 'data', nullable: true, default: () => 'getdate()' })
  data: Date | null;

  @Column('bit', { name: 'approvata', nullable: true })
  approvata: boolean | null;

  @ManyToOne(() => UtenteEntity, utente => utente.candidaturas)
  @JoinColumn([{ name: 'utente_cf', referencedColumnName: 'cf' }])
  utenteCf: UtenteEntity;

  @ManyToOne(() => OffertaLavoroEntity, offertaLavoro => offertaLavoro.candidaturas)
  @JoinColumn([{ name: 'offerta_id', referencedColumnName: 'id' }])
  offerta: OffertaLavoroEntity;
}