export type CreateJobRes = {
  message: string;
  createdJobOffer: Job;
};

export type Job = {
  id: number;
  responsabileCf: string | null;
  ruolo: string | null;
  struttura: string | null;
  dataCreazione: Date | null;
  dataScadenza: Date | null;
  approvata: boolean | null;
  attiva: boolean | null;
  punteggio?: number | null;
  candidaturas?: Candidatura[] | null;
  richiestaSoftSkills?: RichiestaSoftSkill[] | null;
};

export type Candidatura = {
  id: number;
  data: Date | null;
  approvata: boolean | null;
  utenteCf?: string | any;
  offerta?: number | any;
};

export type RichiestaSoftSkill = {
  id: number;
  ordine: number | null;
  offerta?: number | any;
  softSkill?: number | any;
  risposta?: number | any;
};
