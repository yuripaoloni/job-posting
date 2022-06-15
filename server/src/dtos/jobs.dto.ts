import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, MaxLength, ValidateNested } from 'class-validator';

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

  @ValidateNested({ each: true })
  @Type(() => SkillsOrder)
  public skillsOrder: SkillsOrder[];

  @ValidateNested({ each: true })
  @Type(() => AnswersOrder)
  public answersOrder: AnswersOrder[];
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
