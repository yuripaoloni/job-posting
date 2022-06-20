import { Column, Entity, Index, JoinColumn, PrimaryGeneratedColumn, BaseEntity, OneToOne, OneToMany } from 'typeorm';
import { OffertaLavoroEntity } from './offertaLavoro.entity';
import { RichiestaOfferta } from '@/interfaces/richiestaOfferta.interface';
import { RichiestaCompetenzeLinguisticheEntity } from './richiestaCompetenzeLinguistiche';

@Index('PK_richiesta_offerta', ['id'], { unique: true })
@Entity('richiesta_offerta', { schema: 'dbo' })
export class RichiestaOffertaEntity extends BaseEntity implements RichiestaOfferta {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('nvarchar', { name: 'preparazione', nullable: true, length: 255 })
  preparazione: string | null;

  @Column('int', { name: 'punti_preparazione', nullable: true })
  puntiPreparazione: number | null;

  @Column('bit', { name: 'esperienza_lavorativa', nullable: true, default: 0 })
  esperienzaLavorativa: boolean | null;

  @Column('int', { name: 'punti_esperienza_lavorativa', nullable: true })
  puntiEsperienzaLavorativa: number | null;

  @Column('bit', { name: 'esperienza_unicam', nullable: true, default: 0 })
  esperienzaUnicam: boolean | null;

  @Column('int', { name: 'punti_esperienza_unicam', nullable: true })
  puntiEsperienzaUnicam: number | null;

  @OneToMany(() => RichiestaCompetenzeLinguisticheEntity, richiestaCompetenzeLinguistiche => richiestaCompetenzeLinguistiche.richiestaOfferta)
  richiestaCompetenzeLinguistiches: RichiestaCompetenzeLinguisticheEntity[];

  @OneToOne(() => OffertaLavoroEntity, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'offerta_id', referencedColumnName: 'id' }])
  offerta: OffertaLavoroEntity;
}
