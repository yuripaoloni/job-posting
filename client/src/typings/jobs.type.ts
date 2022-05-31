import { RisposteSoftSkill, SoftSkill } from "./softSkill.type";
import { Utente } from "./utente.type";

export type JobRes = {
  message: string;
  jobOffer: Job;
};

export type Job = {
  id: number;
  responsabileCf: string | null;
  ruolo: string | null;
  struttura: string | null;
  dataCreazione: string | null;
  dataScadenza: string | null;
  approvata: boolean | null;
  attiva: boolean | null;
  punteggio?: number | null;
  descEsito?: string | null;
  candidaturas?: Candidatura[] | null;
  richiestaSoftSkills?: RichiestaSoftSkill[] | null;
};

export type Candidatura = {
  id: number;
  data: Date | null;
  approvata: boolean | null;
  punteggio: number | null;
  utenteCf?: Utente | null;
  offerta?: number | any;
};

export type RichiestaSoftSkill = {
  id: number;
  ordine: number;
  offerta?: number | any;
  softSkill?: SoftSkill;
  rispostaRichiestaSoftSkills?: RispostaRichiestaSoftSkill[];
};

export type RispostaRichiestaSoftSkill = {
  id: number;
  ordine: number;
  richiestaId: number | any;
  rispostaId: RisposteSoftSkill;
};
