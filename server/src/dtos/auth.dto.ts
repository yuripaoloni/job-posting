import { IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MaxLength(255)
  public username: string;

  @IsString()
  @MaxLength(255)
  public password: string;
}
