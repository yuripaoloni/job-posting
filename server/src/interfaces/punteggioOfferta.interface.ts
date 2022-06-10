import { OffertaLavoro } from './offertaLavoro.interface';
import { Utente } from './utente.interface';

export interface PunteggioOfferta {
  id: number;
  punteggio: number | null;
  data: Date | null;
  utenteCf?: string | Utente;
  offerta?: number | OffertaLavoro;
}
