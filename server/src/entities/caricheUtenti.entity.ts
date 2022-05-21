import { Index, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { TipiUtenteEntity } from './tipiUtente.entity';
import { StruttureEntity } from './strutture.entity';
import { CaricheUtenti } from '@/interfaces/caricheUtenti.interface';

@Index('PK_cariche_utenti', ['id'], { unique: true })
@Entity('cariche_utenti', { schema: 'dbo' })
export class CaricheUtentiEntity extends BaseEntity implements CaricheUtenti {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('nvarchar', { name: 'utente_cf', length: 255 })
  utenteCf: string;

  @Column('date', { name: 'data_fine', nullable: true })
  dataFine: Date | null;

  @ManyToOne(() => StruttureEntity, strutture => strutture.caricheUtentis)
  @JoinColumn([{ name: 'id_struttura', referencedColumnName: 'idStruttura' }])
  idStruttura: StruttureEntity;

  @ManyToOne(() => TipiUtenteEntity, tipiUtente => tipiUtente.caricheUtentis)
  @JoinColumn([{ name: 'id_tipoutente', referencedColumnName: 'idTipoutente' }])
  idTipoutente: TipiUtenteEntity;
}
