import { CaricheUtenti } from './caricheUtenti.interface';

export interface TipiUtente {
  idTipoutente: number;
  descrizioneUtente: string;
  caricheUtentis?: CaricheUtenti[] | null;
}
