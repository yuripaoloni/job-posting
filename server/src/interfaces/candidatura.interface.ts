export interface Candidatura {
  id: number;
  data: Date | null;
  approvata: boolean | null;
  punteggio: number | null;
  utenteCf?: string | any;
  offerta?: number | any;
}
