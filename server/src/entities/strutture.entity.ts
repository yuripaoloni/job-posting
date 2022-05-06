import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { CaricheUtentiEntity } from './caricheUtenti.entity';
import { UtenteEntity } from './utente.entity';

@Index('PK_strutture', ['idStruttura'], { unique: true })
@Entity('strutture', { schema: 'dbo' })
export class StruttureEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_struttura' })
  idStruttura: number;

  @Column('text', { name: 'desc_struttura', nullable: true })
  descStruttura: string | null;

  @OneToMany(() => CaricheUtentiEntity, caricheUtenti => caricheUtenti.idStruttura)
  caricheUtentis: CaricheUtentiEntity[];

  @OneToMany(() => UtenteEntity, utente => utente.struttura)
  utentes: UtenteEntity[];
}