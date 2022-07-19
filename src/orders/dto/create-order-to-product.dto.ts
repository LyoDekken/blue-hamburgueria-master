import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsUUID } from 'class-validator';

export class CreateOrderToProductDto {
  @IsUUID()
  @ApiProperty({
    description: 'Id do produto sendo pedido',
    example: '57868bc9-8f43-4302-adaa-41294d718c8a',
  })
  productId: string;

  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'Quantidade de produtos',
    example: 2,
  })
  quantity: number;
}