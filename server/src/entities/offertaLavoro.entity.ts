import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { CandidaturaEntity } from './candidatura.entity';
import { RichiestaSoftSkillEntity } from './richiestaSoftSkill.entity';
import { RisposteUtenteEntity } from './risposteUtente.entity';

@Index('PK__offerta___3213E83F411E9D17', ['id'], { unique: true })
@Entity('offerta_lavoro', { schema: 'dbo' })
export class OffertaLavoroEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'responsabile_id', nullable: true })
  responsabileId: number | null;

  @Column('nvarchar', { name: 'ruolo', nullable: true, length: 255 })
  ruolo: string | null;

  @Column('nvarchar', { name: 'struttura', nullable: true, length: 255 })
  struttura: string | null;

  @Column('date', {
    name: 'data_creazione',
    nullable: true,
    default: () => 'getdate()',
  })
  dataCreazione: Date | null;

  @Column('date', { name: 'data_scadenza', nullable: true })
  dataScadenza: Date | null;

  @Column('bit', { name: 'approvata', nullable: true })
  approvata: boolean | null;

  @Column('bit', { name: 'attiva', nullable: true })
  attiva: boolean | null;

  @OneToMany(() => CandidaturaEntity, candidatura => candidatura.offerta)
  candidaturas: CandidaturaEntity[];

  @OneToMany(() => RichiestaSoftSkillEntity, richiestaSoftSkill => richiestaSoftSkill.offerta)
  richiestaSoftSkills: RichiestaSoftSkillEntity[];

  @OneToMany(() => RisposteUtenteEntity, risposteUtente => risposteUtente.offerta)
  risposteUtentes: RisposteUtenteEntity[];
}
