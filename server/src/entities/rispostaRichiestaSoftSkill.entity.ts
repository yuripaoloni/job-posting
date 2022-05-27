import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { RichiestaSoftSkillEntity } from './richiestaSoftSkill.entity';
import { RisposteSoftSkillEntity } from './risposteSoftSkill.entity';
import { RispostaRichiestaSoftSkill } from '@/interfaces/rispostaRichiestaSoftSkill.interface';

@Index('PK_risposta_richiesta_soft_skill', ['id'], { unique: true })
@Entity('risposta_richiesta_soft_skill', { schema: 'dbo' })
export class RispostaRichiestaSoftSkillEntity extends BaseEntity implements RispostaRichiestaSoftSkill {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'ordine', nullable: true })
  ordine: number | null;

  @ManyToOne(() => RichiestaSoftSkillEntity, richiestaSoftSkill => richiestaSoftSkill.rispostaRichiestaSoftSkills, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'richiesta_id', referencedColumnName: 'id' }])
  richiestaId: RichiestaSoftSkillEntity;

  @ManyToOne(() => RisposteSoftSkillEntity, risposteSoftSkillEntity => risposteSoftSkillEntity.rispostaRichiestaSoftSkills)
  @JoinColumn([{ name: 'risposta_id', referencedColumnName: 'idRisposta' }])
  rispostaId: RisposteSoftSkillEntity;
}
