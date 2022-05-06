import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { UtenteEntity } from './utente.entity';

@Index('PK__competen__3213E83F76E9509B', ['id'], { unique: true })
@Entity('competenze_linguistiche', { schema: 'dbo' })
export class CompetenzeLinguisticheEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('nvarchar', { name: 'lingua', nullable: true, length: 255 })
  lingua: string | null;

  @Column('nvarchar', { name: 'livello', length: 255 })
  livello: string;

  @ManyToOne(() => UtenteEntity, utente => utente.competenzeLinguistiches)
  @JoinColumn([{ name: 'utente_cf', referencedColumnName: 'cf' }])
  utenteCf: UtenteEntity;
}
