import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FavoriteProductDto {
  @IsUUID()
  @ApiProperty({
    description: 'Id do usuário que está favoritando o produto',
    example: '4d0440d1-2abc-4e7d-a080-5e21e09a7b3a',
  })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do produto a ser favoritado',
    example: 'Hamburguer Salada',
  })
  productName: string;
}