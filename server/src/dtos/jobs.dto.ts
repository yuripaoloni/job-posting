import { IsString } from 'class-validator';

export class JobOfferDto {
  @IsString()
  public role: string;

  @IsString()
  public expiryDate: string;
}
