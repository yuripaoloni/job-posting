export type UserType = 0 | 1 | 2; //1 - DG, 2 - responsabile struttura

export type Utente = {
  cf: string;
  nome: string | null;
  cognome: string | null;
  username: string | null;
  email: string | null;
  annoPrimaOccupazione: number | null;
  annoIngressoUnicam: number | null;
  preparazione: string | null;
  candidaturas?: Candidatura[] | null;
  competenzeLinguistiches?: CompetenzeLinguistiche[] | null;
  risposteUtentes?: RisposteUtente[] | null;
  struttura?: number | any;
};

export type Candidatura = {
  id: number;
  data: Date | null;
  approvata: boolean | null;
  utenteCf?: string | any;
  offerta?: number | any;
};

export type CompetenzeLinguistiche = {
  id: number;
  lingua: string | null;
  livello: string;
  utenteCf?: string | any;
};

export type RisposteUtente = {
  id: number;
  dataIns: Date | null;
  utenteCf?: string | any;
  softSkill?: number | any;
  risposta?: number | any;
};
