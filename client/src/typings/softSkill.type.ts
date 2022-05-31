export type SoftSkill = {
  id: number;
  titolo: string;
  descrizione: string;
  risposteSoftSkills: RisposteSoftSkill[];
};

export type RisposteSoftSkill = {
  idRisposta: number;
  descrizione: string | null;
};

export type SkillsOrder = {
  id: number;
  order: number;
};

export type AnswersOrder = {
  softSkillId: number;
  answers: Answer[];
};

export type Answer = {
  answerId: number;
  order: number;
};
