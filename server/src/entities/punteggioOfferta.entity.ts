import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { UtenteEntity } from './utente.entity';
import { OffertaLavoroEntity } from './offertaLavoro.entity';
import { PunteggioOfferta } from '@/interfaces/punteggioOfferta.interface';

@Index('PK_punteggio_offerta', ['id'], { unique: true }) //TO DO update
@Entity('punteggio_offerta', { schema: 'dbo' })
export class PunteggioOffertaEntity extends BaseEntity implements PunteggioOfferta {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'int', name: 'punteggio', nullable: true })
  punteggio: number | null;

  @Column('date', { name: 'data', nullable: true, default: () => 'getdate()' })
  data: Date | null;

  @ManyToOne(() => OffertaLavoroEntity, offertaLavoro => offertaLavoro.candidaturas, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'offerta_id', referencedColumnName: 'id' }])
  offerta: OffertaLavoroEntity;

  @ManyToOne(() => UtenteEntity, utente => utente.candidaturas)
  @JoinColumn([{ name: 'utente_cf', referencedColumnName: 'cf' }])
  utenteCf: UtenteEntity;
}
