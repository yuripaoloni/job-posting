export interface Utente {
  cf: string;
  nome: string | null;
  cognome: string | null;
  username: string | null;
  email: string | null;
  annoPrimaOccupazione: number | null;
  annoIngressoUnicam: number | null;
  preparazione: string | null;
  struttura: number | any;
}
