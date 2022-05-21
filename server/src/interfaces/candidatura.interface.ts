export interface Candidatura {
  id: number;
  data: Date | null;
  approvata: boolean | null;
  utenteCf?: string | any;
  offerta?: number | any;
}
