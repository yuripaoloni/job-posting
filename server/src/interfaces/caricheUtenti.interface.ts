export interface CaricheUtenti {
  id: number;
  utenteCf: string;
  dataFine: Date | null;
  idStruttura?: number | any;
  idTipoutente?: number | any;
}
