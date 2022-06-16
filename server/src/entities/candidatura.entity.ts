import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { UtenteEntity } from './utente.entity';
import { OffertaLavoroEntity } from './offertaLavoro.entity';
import { Candidatura } from '@/interfaces/candidatura.interface';

@Index('PK__candidat__3213E83F83AC25FB', ['id'], { unique: true })
@Entity('candidatura', { schema: 'dbo' })
export class CandidaturaEntity extends BaseEntity implements Candidatura {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('date', { name: 'data', nullable: true, default: () => 'getdate()' })
  data: Date | null;

  @Column('bit', { name: 'approvata', nullable: true })
  approvata: boolean | null;

  @Column('bit', { name: 'colloquio', nullable: true, default: 0 })
  colloquio: boolean | null;

  @Column({ type: 'int', name: 'punteggio', nullable: true })
  punteggio: number | null;

  @ManyToOne(() => UtenteEntity, utente => utente.candidaturas)
  @JoinColumn([{ name: 'utente_cf', referencedColumnName: 'cf' }])
  utenteCf: UtenteEntity;

  @ManyToOne(() => OffertaLavoroEntity, offertaLavoro => offertaLavoro.candidaturas, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'offerta_id', referencedColumnName: 'id' }])
  offerta: OffertaLavoroEntity;
}
