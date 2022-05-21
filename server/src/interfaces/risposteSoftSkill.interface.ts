import { RichiestaSoftSkill } from './richiestaSoftSkill.interface';
import { RisposteUtente } from './risposteUtente.interface';

export interface RisposteSoftSkill {
  idRisposta: number;
  descrizione: string | null;
  richiestaSoftSkills?: RichiestaSoftSkill[] | null;
  softSkill?: number | any;
  risposteUtentes?: RisposteUtente[] | null;
}
