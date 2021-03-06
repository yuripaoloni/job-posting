import { RichiestaSoftSkill } from './richiestaSoftSkill.interface';
import { RisposteSoftSkill } from './risposteSoftSkill.interface';
import { RisposteUtente } from './risposteUtente.interface';

export interface SoftSkills {
  id: number;
  titolo: string | null;
  descrizione: string | null;
  risposteSoftSkills?: RisposteSoftSkill[] | null;
  richiestaSoftSkills?: RichiestaSoftSkill[] | null;
  risposteUtentes?: RisposteUtente[] | null;
}
