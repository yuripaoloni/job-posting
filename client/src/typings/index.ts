export type UserType = 0 | 1 | 2; //1 - DG, 2 - responsabile struttura

export type AlertVariant = "success" | "danger" | "warning" | "info";

export type Job = [];

export type LoginRes = {
  tipoUtenteId: UserType;
  message: string;
  username?: string;
};

export type SoftSkill = {
  id: number;
  titolo: string | null;
  descrizione: string | null;
  risposteSoftSkills: RisposteSoftSkill[];
};

type RisposteSoftSkill = {
  idRisposta: number;
  descrizione: string | null;
};
