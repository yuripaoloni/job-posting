export interface SoftSkills {
  id: number;
  titolo: string | null;
  descrizione: string | null;
  risposteSoftSkills: RisposteSoftSkill[];
}

export interface RisposteSoftSkill {
  idRisposta: number;
  descrizione: string | null;
}
