import { CompetenzeLinguistiche } from '@/interfaces/competenzeLinguistiche.interface';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class UpdateProfileDto {
  @IsNumber()
  public firstOccupationYear: number;

  @IsString()
  public preparation: string;

  @IsString()
  public category: string;

  @ValidateNested({ each: true })
  @Type(() => Languages)
  public languages: Languages[];
}

class Languages implements CompetenzeLinguistiche {
  @IsNumber()
  id: number;

  @IsString()
  lingua: string;

  @IsString()
  livello: string;

  @IsString()
  @IsOptional()
  utenteCf?: string;
}
