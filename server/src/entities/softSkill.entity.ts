import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { RichiestaSoftSkillEntity } from './richiestaSoftSkill.entity';
import { RisposteSoftSkillEntity } from './risposteSoftSkill.entity';
import { RisposteUtenteEntity } from './risposteUtente.entity';

@Index('PK__soft_ski__3213E83F3C9588D0', ['id'], { unique: true })
@Entity('soft_skill', { schema: 'dbo' })
export class SoftSkillEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('nvarchar', { name: 'titolo', nullable: true, length: 255 })
  titolo: string | null;

  @Column('nvarchar', { name: 'descrizione', nullable: true, length: 255 })
  descrizione: string | null;

  @OneToMany(() => RichiestaSoftSkillEntity, richiestaSoftSkill => richiestaSoftSkill.softSkill)
  richiestaSoftSkills: RichiestaSoftSkillEntity[];

  @OneToMany(() => RisposteSoftSkillEntity, risposteSoftSkill => risposteSoftSkill.softSkill)
  risposteSoftSkills: RisposteSoftSkillEntity[];

  @OneToMany(() => RisposteUtenteEntity, risposteUtente => risposteUtente.softSkill)
  risposteUtentes: RisposteUtenteEntity[];
}
