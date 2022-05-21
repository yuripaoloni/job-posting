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
