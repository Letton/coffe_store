import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

@InputType()
export class RegisterDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  username: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

@InputType()
export class LoginDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  username: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

@InputType()
export class ActivationDto {
  @Field()
  @IsNotEmpty()
  activationToken: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(6)
  activationCode: string;
}
