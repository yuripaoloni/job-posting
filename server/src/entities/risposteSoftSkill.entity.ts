import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { RichiestaSoftSkillEntity } from './richiestaSoftSkill.entity';
import { SoftSkillEntity } from './softSkill.entity';
import { RisposteUtenteEntity } from './risposteUtente.entity';
import { RisposteSoftSkill } from '@/interfaces/risposteSoftSkill.interface';

@Index('IX_risposte_soft_skill', ['idRisposta'], { unique: true })
@Index('PK_risposte_soft_skill', ['idRisposta'], { unique: true })
@Entity('risposte_soft_skill', { schema: 'dbo' })
export class RisposteSoftSkillEntity extends BaseEntity implements RisposteSoftSkill {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_risposta' })
  idRisposta: number;

  @Column('nvarchar', { name: 'descrizione', nullable: true, length: 255 })
  descrizione: string | null;

  @OneToMany(() => RichiestaSoftSkillEntity, richiestaSoftSkill => richiestaSoftSkill.risposta)
  richiestaSoftSkills: RichiestaSoftSkillEntity[];

  @ManyToOne(() => SoftSkillEntity, softSkill => softSkill.risposteSoftSkills)
  @JoinColumn([{ name: 'soft_skill_id', referencedColumnName: 'id' }])
  softSkill: SoftSkillEntity;

  @OneToMany(() => RisposteUtenteEntity, risposteUtente => risposteUtente.risposta)
  risposteUtentes: RisposteUtenteEntity[];
}
