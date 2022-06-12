import { Candidatura } from './candidatura.interface';
import { PunteggioOfferta } from './punteggioOfferta.interface';
import { RichiestaSoftSkill } from './richiestaSoftSkill.interface';

export interface OffertaLavoro {
  id: number;
  responsabileCf: string | null;
  ruolo: string | null;
  struttura: string | null;
  dataCreazione: Date | null;
  dataScadenza: Date | null;
  approvata: boolean | null;
  attiva: boolean | null;
  punteggiAggiornati: boolean | null;
  punteggio?: PunteggioOfferta | null;
  candidaturas?: Candidatura[] | null;
  richiestaSoftSkills?: RichiestaSoftSkill[] | null;
  punteggi?: PunteggioOfferta[] | null;
}
