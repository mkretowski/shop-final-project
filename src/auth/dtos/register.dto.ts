import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Match } from 'src/utils/match.decorator';

export class RegisterDTO {
  @IsNotEmpty()
  @IsString()
  @Length(2, 40)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 40)
  address: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 40)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 40)
  @Match('password')
  passwordRepeat: string;
}
