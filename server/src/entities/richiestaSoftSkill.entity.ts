import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { OffertaLavoroEntity } from './offertaLavoro.entity';
import { SoftSkillEntity } from './softSkill.entity';
import { RichiestaSoftSkill } from '@/interfaces/richiestaSoftSkill.interface';
import { RispostaRichiestaSoftSkillEntity } from './rispostaRichiestaSoftSkill.entity';

@Index('PK__richiest__3213E83F865269E9', ['id'], { unique: true })
@Entity('richiesta_soft_skill', { schema: 'dbo' })
export class RichiestaSoftSkillEntity extends BaseEntity implements RichiestaSoftSkill {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'ordine', nullable: true })
  ordine: number | null;

  @ManyToOne(() => OffertaLavoroEntity, offertaLavoro => offertaLavoro.richiestaSoftSkills, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'offerta_id', referencedColumnName: 'id' }])
  offerta: OffertaLavoroEntity;

  @ManyToOne(() => SoftSkillEntity, softSkill => softSkill.richiestaSoftSkills)
  @JoinColumn([{ name: 'soft_skill_id', referencedColumnName: 'id' }])
  softSkill: SoftSkillEntity;

  @OneToMany(() => RispostaRichiestaSoftSkillEntity, rispostaRichiestaSoftSkillEntity => rispostaRichiestaSoftSkillEntity.richiestaId)
  rispostaRichiestaSoftSkills: RispostaRichiestaSoftSkillEntity[];
}
