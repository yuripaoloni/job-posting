import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { OffertaLavoroEntity } from './offertaLavoro.entity';
import { SoftSkillEntity } from './softSkill.entity';

@Index('PK__richiest__3213E83F865269E9', ['id'], { unique: true })
@Entity('richiesta_soft_skill', { schema: 'dbo' })
export class RichiestaSoftSkillEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'ordine', nullable: true })
  ordine: number | null;

  @Column('int', { name: 'risposta_1', nullable: true })
  risposta_1: number | null;

  @Column('int', { name: 'risposta_2', nullable: true })
  risposta_2: number | null;

  @Column('int', { name: 'risposta_3', nullable: true })
  risposta_3: number | null;

  @ManyToOne(() => OffertaLavoroEntity, offertaLavoro => offertaLavoro.richiestaSoftSkills)
  @JoinColumn([{ name: 'offerta_id', referencedColumnName: 'id' }])
  offerta: OffertaLavoroEntity;

  @ManyToOne(() => SoftSkillEntity, softSkill => softSkill.richiestaSoftSkills)
  @JoinColumn([{ name: 'soft_skill_id', referencedColumnName: 'id' }])
  softSkill: SoftSkillEntity;
}
