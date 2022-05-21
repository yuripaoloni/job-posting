import { IsNumber } from 'class-validator';

export class SoftSkillAnswersDto {
  @IsNumber({}, { each: true })
  public answers: number[];
}
