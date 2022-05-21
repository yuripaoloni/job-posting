import { Column, Entity, Index, OneToMany, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import { CaricheUtentiEntity } from './caricheUtenti.entity';
import { TipiUtente } from '@/interfaces/tipiUtente.interface';

@Index('PK_tipi_utente', ['idTipoutente'], { unique: true })
@Entity('tipi_utente', { schema: 'dbo' })
export class TipiUtenteEntity extends BaseEntity implements TipiUtente {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_tipoutente' })
  idTipoutente: number;

  @Column('varchar', { name: 'descrizione_utente', length: 50 })
  descrizioneUtente: string;

  @OneToMany(() => CaricheUtentiEntity, caricheUtenti => caricheUtenti.idTipoutente)
  caricheUtentis: CaricheUtentiEntity[];
}
