import { Utente } from './utente.interface';
import { CaricheUtenti } from './caricheUtenti.interface';

export interface Strutture {
  idStruttura: number;
  descStruttura: string | null;
  codiceCsa: string | null;
  caricheUtentis?: CaricheUtenti[] | null;
  utentes?: Utente[] | null;
}
