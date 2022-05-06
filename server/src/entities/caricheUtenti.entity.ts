import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { TipiUtenteEntity } from './tipiUtente.entity';
import { StruttureEntity } from './strutture.entity';

@Entity('cariche_utenti', { schema: 'dbo' })
export class CaricheUtentiEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('nvarchar', { name: 'utente_cf', nullable: true, length: 255 })
  utenteCf: string | null;

  @Column('date', { name: 'data_fine', nullable: true })
  dataFine: Date | null;

  @ManyToOne(() => TipiUtenteEntity, tipiUtente => tipiUtente.caricheUtentis)
  @JoinColumn([{ name: 'id_tipoutente', referencedColumnName: 'idTipoutente' }])
  idTipoutente: TipiUtenteEntity;

  @ManyToOne(() => StruttureEntity, strutture => strutture.caricheUtentis)
  @JoinColumn([{ name: 'id_struttura', referencedColumnName: 'idStruttura' }])
  idStruttura: StruttureEntity;
}
