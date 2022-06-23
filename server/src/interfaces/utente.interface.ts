import { Candidatura } from './candidatura.interface';
import { CompetenzeLinguistiche } from './competenzeLinguistiche.interface';
import { PunteggioOfferta } from './punteggioOfferta.interface';
import { RisposteUtente } from './risposteUtente.interface';

export interface Utente {
  cf: string;
  nome: string | null;
  cognome: string | null;
  username: string | null;
  email: string | null;
  annoPrimaOccupazione: number | null;
  annoIngressoUnicam: number | null;
  categoria: string | null;
  preparazione: string | null;
  candidaturas?: Candidatura[] | null;
  competenzeLinguistiches?: CompetenzeLinguistiche[] | null;
  punteggi?: PunteggioOfferta[] | null;
  risposteUtentes?: RisposteUtente[] | null;
  struttura?: number | any;
}
