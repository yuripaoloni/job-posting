import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { RisposteSoftSkillEntity } from './risposteSoftSkill.entity';
import { SoftSkillEntity } from './softSkill.entity';
import { UtenteEntity } from './utente.entity';

@Index('PK__risposte__3213E83F4959AFE8', ['id'], { unique: true })
@Entity('risposte_utente', { schema: 'dbo' })
export class RisposteUtenteEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('date', { name: 'data_ins', nullable: true })
  dataIns: Date | null;

  @ManyToOne(() => UtenteEntity, utente => utente.risposteUtentes)
  @JoinColumn([{ name: 'utente_cf', referencedColumnName: 'cf' }])
  utenteCf: UtenteEntity;

  @ManyToOne(() => SoftSkillEntity, softSkill => softSkill.risposteUtentes)
  @JoinColumn([{ name: 'soft_skill_id', referencedColumnName: 'id' }])
  softSkill: SoftSkillEntity;

  @ManyToOne(() => RisposteSoftSkillEntity, risposteSoftSkill => risposteSoftSkill.risposteUtentes)
  @JoinColumn([{ name: 'risposta_id', referencedColumnName: 'idRisposta' }])
  risposta: RisposteSoftSkillEntity;
}
