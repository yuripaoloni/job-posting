import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { RichiestaSoftSkillEntity } from './richiestaSoftSkill.entity';
import { RisposteUtenteEntity } from './risposteUtente.entity';

@Index('PK__soft_ski__3213E83F3C9588D0', ['id'], { unique: true })
@Entity('soft_skill', { schema: 'dbo' })
export class SoftSkillEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('nvarchar', { name: 'descrizione', nullable: true, length: 255 })
  descrizione: string | null;

  @Column('nvarchar', { name: 'risposta_1', nullable: true, length: 255 })
  risposta_1: string | null;

  @Column('nvarchar', { name: 'risposta_2', nullable: true, length: 255 })
  risposta_2: string | null;

  @Column('nvarchar', { name: 'risposta_3', nullable: true, length: 255 })
  risposta_3: string | null;

  @Column('nvarchar', {
    name: 'risposta_4',
    nullable: true,
    length: 255,
    default: () => "'Preferisco non rispondere'",
  })
  risposta_4: string | null;

  @OneToMany(() => RichiestaSoftSkillEntity, richiestaSoftSkill => richiestaSoftSkill.softSkill)
  richiestaSoftSkills: RichiestaSoftSkillEntity[];

  @OneToMany(() => RisposteUtenteEntity, risposteUtente => risposteUtente.softSkill)
  risposteUtentes: RisposteUtenteEntity[];
}
