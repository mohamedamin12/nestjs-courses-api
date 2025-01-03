import { IsEmail, IsNotEmpty, IsString, Length, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2 , 150)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(250)
  email:string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}