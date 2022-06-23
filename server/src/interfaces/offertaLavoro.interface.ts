import { Candidatura } from './candidatura.interface';
import { PunteggioOfferta } from './punteggioOfferta.interface';
import { RichiestaOfferta } from './richiestaOfferta.interface';
import { RichiestaSoftSkill } from './richiestaSoftSkill.interface';

export interface OffertaLavoro {
  id: number;
  responsabileCf: string | null;
  ruolo: string | null;
  descrizione: string | null;
  categoria: string | null;
  struttura: string | null;
  dataCreazione: Date | null;
  dataScadenza: Date | null;
  approvata: boolean | null;
  attiva: boolean | null;
  punteggiAggiornati: boolean | null;
  richiestaOfferta?: RichiestaOfferta;
  punteggio?: PunteggioOfferta | null;
  candidaturas?: Candidatura[] | null;
  richiestaSoftSkills?: RichiestaSoftSkill[] | null;
  punteggi?: PunteggioOfferta[] | null;
}
