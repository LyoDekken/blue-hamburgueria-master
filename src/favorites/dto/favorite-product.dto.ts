import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FavoriteProductDto {
  @IsUUID()
  @ApiProperty({
    description: 'Id do usuário que está favoritando o produto',
    example: 'f11b0958-efa2-4b4f-9b84-36633e5529b8',
  })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do produto que está sendo favoritado',
    example: 'hamburguer Salada',
  })
  productName: string;
}