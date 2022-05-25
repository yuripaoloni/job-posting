import { RispostaRichiestaSoftSkill } from './rispostaRichiestaSoftSkill.interface';

export interface RichiestaSoftSkill {
  id: number;
  ordine: number | null;
  offerta?: number | any;
  softSkill?: number | any;
  rispostaRichiestaSoftSkills?: RispostaRichiestaSoftSkill[] | null;
}
