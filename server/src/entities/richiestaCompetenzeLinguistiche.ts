import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { RichiestaCompetenzeLinguistiche } from '@/interfaces/richiestaCompetenzeLinguistiche.interface';
import { RichiestaOffertaEntity } from './richiestaOfferta.entity';

//TODO @Index('PK__competen__3213E83F76E9509B', ['id'], { unique: true })
@Entity('richiesta_competenze_linguistiche', { schema: 'dbo' })
export class RichiestaCompetenzeLinguisticheEntity extends BaseEntity implements RichiestaCompetenzeLinguistiche {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('nvarchar', { name: 'lingua', nullable: true, length: 255 })
  lingua: string | null;

  @Column('nvarchar', { name: 'livello', length: 255 })
  livello: string;

  @Column('int', { name: 'punti', nullable: true })
  punti: number | null;

  @ManyToOne(() => RichiestaOffertaEntity, richiestaOfferta => richiestaOfferta.richiestaCompetenzeLinguistiches, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'richiesta_offerta_id', referencedColumnName: 'id' }])
  richiestaOfferta: RichiestaOffertaEntity;
}
