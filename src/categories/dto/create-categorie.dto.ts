import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategorieDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome da categoria de produtos',
    example: 'Lanches',
  })
  name: string;
}