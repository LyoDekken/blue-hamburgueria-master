import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Ivan',
    description: 'Nome do usuário a ser criado',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    example: 'ivan@blue.com',
    description: 'Email do usuário a ser criado',
  })
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'weak password',
  })
  @ApiProperty({
    example: '@Abc1234',
    description:
      'Senha do usuário a ser criado, mínimo de uma letra minúscula, uma maiuscula, um simbolo e um número.',
  })
  password: string;
}