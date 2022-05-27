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

export type SkillsOrder = {
  id: number;
  order: number;
}[];

export type AnswersOrder = {
  softSkillId: number;
  answers: {
    answerId: number;
    order: number;
  }[];
}[];
