import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, Max, MaxLength, ValidateNested } from 'class-validator';

export class JobOfferDto {
  @IsString()
  @MaxLength(255)
  public role: string;

  @IsString()
  @MaxLength(500)
  public description: string;

  @IsString()
  @MaxLength(255)
  public expiryDate: string;

  @Type(() => Preparation)
  public preparation: Preparation;

  @Type(() => UnicamExperience)
  public unicamExperience: UnicamExperience;

  @Type(() => WorkExperience)
  public workExperince: WorkExperience;

  @ValidateNested({ each: true })
  @Type(() => LanguagesPoints)
  public languages: LanguagesPoints[];

  @ValidateNested({ each: true })
  @Type(() => SkillsOrder)
  public skillsOrder: SkillsOrder[];

  @ValidateNested({ each: true })
  @Type(() => AnswersOrder)
  public answersOrder: AnswersOrder[];
}

class LanguagesPoints {
  @IsNumber()
  public id: number;

  @IsString()
  public lingua: string;

  @IsString()
  public livello: string;

  @IsNumber()
  @Max(50)
  public points: number;
}

class Preparation {
  @IsString()
  public value: string;

  @IsNumber()
  @Max(50)
  public points: number;
}

class UnicamExperience {
  @IsBoolean()
  public value: boolean;

  @IsNumber()
  @Max(50)
  public points: number;
}

class WorkExperience {
  @IsBoolean()
  public value: boolean;

  @IsNumber()
  @Max(50)
  public points: number;
}

class SkillsOrder {
  @IsNumber()
  public id: number;

  @IsNumber()
  public order: number;
}

class AnswersOrder {
  @IsNumber()
  public softSkillId: number;

  @ValidateNested({ each: true })
  @Type(() => Answer)
  public answers: Answer[];
}

class Answer {
  @IsNumber()
  public answerId: number;

  @IsNumber()
  public order: number;
}

export class ApplyJobDto {
  @IsNumber()
  public jobOfferId: number;

  @IsNumber()
  public score: number;
}

export class DetermineJobDto {
  @IsBoolean()
  public approved: boolean;

  @IsNumber()
  public jobOfferId: number;

  @IsString()
  @MaxLength(255)
  public message: string;
}

export class InterviewDto {
  @ValidateNested({ each: true })
  @Type(() => Invite)
  public invites: Invite[];

  @IsBoolean({ each: true })
  public selected: boolean[];
}

class Invite {
  @IsNumber()
  public candidaturaId: number;

  @IsString()
  public time: string;

  @IsString()
  public date: string;

  @IsString()
  public place: string;
}
