import { OffertaLavoro } from './offertaLavoro.interface';
import { Utente } from './utente.interface';

export interface Candidatura {
  id: number;
  data: Date | null;
  approvata: boolean | null;
  utenteCf?: string | Utente;
  offerta?: number | OffertaLavoro;
}
