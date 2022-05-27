import { Type } from 'class-transformer';
import { IsNumber, IsArray, ValidateNested } from 'class-validator';

export class SoftSkillAnswersDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SoftSkillAnswer)
  public answers: SoftSkillAnswer[];
}

export class SoftSkillAnswer {
  @IsNumber()
  public skillId: number;

  @IsNumber()
  public answerId: number;
}
