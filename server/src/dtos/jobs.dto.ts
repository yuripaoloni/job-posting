import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

export class JobOfferDto {
  @IsString()
  public role: string;

  @IsString()
  public expiryDate: string;

  @IsArray()
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
