export type SoftSkill = {
  id: number;
  titolo: string;
  descrizione: string;
  risposteSoftSkills: RisposteSoftSkill[];
};

type RisposteSoftSkill = {
  idRisposta: number;
  descrizione: string | null;
};
