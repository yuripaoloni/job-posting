import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { SoftSkillEntity } from './softSkill.entity';
import { UtenteEntity } from './utente.entity';

@Index('PK__risposte__3213E83F4959AFE8', ['id'], { unique: true })
@Entity('risposte_utente', { schema: 'dbo' })
export class RisposteUtenteEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'numbero_risposta', nullable: true })
  numberoRisposta: number | null;

  @Column('date', { name: 'data_ins', nullable: true })
  dataIns: Date | null;

  @ManyToOne(() => SoftSkillEntity, softSkill => softSkill.risposteUtentes)
  @JoinColumn([{ name: 'soft_skill_id', referencedColumnName: 'id' }])
  softSkill: SoftSkillEntity;

  @ManyToOne(() => UtenteEntity, utente => utente.risposteUtentes)
  @JoinColumn([{ name: 'utente_cf', referencedColumnName: 'cf' }])
  utenteCf: UtenteEntity;
}
