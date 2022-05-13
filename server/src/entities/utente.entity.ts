import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, BaseEntity } from 'typeorm';
import { CandidaturaEntity } from './candidatura.entity';
import { CompetenzeLinguisticheEntity } from './competenzeLinguistiche.entity';
import { Utente } from '@interfaces/utente.interface';
import { RisposteUtenteEntity } from './risposteUtente.entity';
import { StruttureEntity } from './strutture.entity';

@Index('PK__utente__32136660462A933F', ['cf'], { unique: true })
@Entity('utente', { schema: 'dbo' })
export class UtenteEntity extends BaseEntity implements Utente {
  @Column('nvarchar', { primary: true, name: 'cf', length: 255 })
  cf: string;

  @Column('nvarchar', { name: 'nome', nullable: true, length: 255 })
  nome: string | null;

  @Column('nvarchar', { name: 'cognome', nullable: true, length: 255 })
  cognome: string | null;

  @Column('nvarchar', { name: 'username', nullable: true, length: 255 })
  username: string | null;

  @Column('nvarchar', { name: 'email', nullable: true, length: 255 })
  email: string | null;

  @Column('int', { name: 'anno_prima_occupazione', nullable: true })
  annoPrimaOccupazione: number | null;

  @Column('int', { name: 'anno_ingresso_unicam', nullable: true })
  annoIngressoUnicam: number | null;

  @Column('nvarchar', { name: 'preparazione', nullable: true, length: 255 })
  preparazione: string | null;

  @OneToMany(() => CandidaturaEntity, candidatura => candidatura.utenteCf)
  candidaturas: CandidaturaEntity[];

  @OneToMany(() => CompetenzeLinguisticheEntity, competenzeLinguistiche => competenzeLinguistiche.utenteCf)
  competenzeLinguistiches: CompetenzeLinguisticheEntity[];

  @OneToMany(() => RisposteUtenteEntity, risposteUtente => risposteUtente.utenteCf)
  risposteUtentes: RisposteUtenteEntity[];

  @ManyToOne(() => StruttureEntity, strutture => strutture.utentes)
  @JoinColumn([{ name: 'struttura_id', referencedColumnName: 'idStruttura' }])
  struttura: StruttureEntity;
}
