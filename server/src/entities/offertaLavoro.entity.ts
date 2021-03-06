import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, BaseEntity, OneToOne } from 'typeorm';
import { CandidaturaEntity } from './candidatura.entity';
import { RichiestaSoftSkillEntity } from './richiestaSoftSkill.entity';
import { OffertaLavoro } from '@/interfaces/offertaLavoro.interface';
import { PunteggioOffertaEntity } from './punteggioOfferta.entity';
import { RichiestaOffertaEntity } from './richiestaOfferta.entity';

@Index('PK__offerta___3213E83F411E9D17', ['id'], { unique: true })
@Entity('offerta_lavoro', { schema: 'dbo' })
export class OffertaLavoroEntity extends BaseEntity implements OffertaLavoro {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('nvarchar', { name: 'responsabile_cf', nullable: true, length: 255 })
  responsabileCf: string | null;

  @Column('nvarchar', { name: 'ruolo', nullable: true, length: 255 })
  ruolo: string | null;

  @Column('nvarchar', { name: 'descrizione', nullable: true, length: 500 })
  descrizione: string | null;

  @Column('nvarchar', { name: 'categoria', nullable: true, length: 255 })
  categoria: string | null;

  @Column('nvarchar', { name: 'struttura', nullable: true, length: 255 })
  struttura: string | null;

  @Column('date', {
    name: 'data_creazione',
    nullable: true,
    default: () => 'getdate()',
  })
  dataCreazione: Date | null;

  @Column('date', { name: 'data_approvazione', nullable: true })
  dataApprovazione: Date | null;

  @Column('date', { name: 'data_scadenza', nullable: true })
  dataScadenza: Date | null;

  @Column('bit', { name: 'approvata', nullable: true })
  approvata: boolean | null;

  @Column('bit', { name: 'attiva', nullable: true })
  attiva: boolean | null;

  @Column('bit', { name: 'punteggi_aggiornati', nullable: true, default: 0 })
  punteggiAggiornati: boolean | null;

  @Column('nvarchar', { name: 'desc_esito', nullable: true, length: 255 })
  descEsito: string | null;

  @OneToMany(() => CandidaturaEntity, candidatura => candidatura.offerta)
  candidaturas: CandidaturaEntity[];

  @OneToMany(() => RichiestaSoftSkillEntity, richiestaSoftSkill => richiestaSoftSkill.offerta)
  richiestaSoftSkills: RichiestaSoftSkillEntity[];

  @OneToOne(() => RichiestaOffertaEntity, richiestaOfferta => richiestaOfferta.offerta)
  richiestaOfferta: RichiestaOffertaEntity;

  @OneToMany(() => PunteggioOffertaEntity, punteggioOfferta => punteggioOfferta.offerta)
  punteggi: PunteggioOffertaEntity[];
}
