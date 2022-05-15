import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { OffertaLavoroEntity } from './offertaLavoro.entity';
import { RisposteSoftSkillEntity } from './risposteSoftSkill.entity';
import { SoftSkillEntity } from './softSkill.entity';

@Index('PK__richiest__3213E83F865269E9', ['id'], { unique: true })
@Entity('richiesta_soft_skill', { schema: 'dbo' })
export class RichiestaSoftSkillEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'ordine', nullable: true })
  ordine: number | null;

  @ManyToOne(() => OffertaLavoroEntity, offertaLavoro => offertaLavoro.richiestaSoftSkills)
  @JoinColumn([{ name: 'offerta_id', referencedColumnName: 'id' }])
  offerta: OffertaLavoroEntity;

  @ManyToOne(() => SoftSkillEntity, softSkill => softSkill.richiestaSoftSkills)
  @JoinColumn([{ name: 'soft_skill_id', referencedColumnName: 'id' }])
  softSkill: SoftSkillEntity;

  @ManyToOne(() => RisposteSoftSkillEntity, risposteSoftSkill => risposteSoftSkill.richiestaSoftSkills)
  @JoinColumn([{ name: 'risposta_id', referencedColumnName: 'idRisposta' }])
  risposta: RisposteSoftSkillEntity;
}
