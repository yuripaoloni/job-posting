import { Column, Entity, Index, OneToMany, BaseEntity } from 'typeorm';
import { CaricheUtentiEntity } from './caricheUtenti.entity';

@Index('PK_tipi_utente', ['idTipoutente'], { unique: true })
@Entity('tipi_utente', { schema: 'dbo' })
export class TipiUtenteEntity extends BaseEntity {
  @Column('int', { primary: true, name: 'id_tipoutente' })
  idTipoutente: number;

  @Column('varchar', { name: 'descrizione_utente', length: 50 })
  descrizioneUtente: string;

  @OneToMany(() => CaricheUtentiEntity, caricheUtenti => caricheUtenti.idTipoutente)
  caricheUtentis: CaricheUtentiEntity[];
}
