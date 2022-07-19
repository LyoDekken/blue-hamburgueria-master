import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Número da mesa que fez o pedido',
    example: 10,
  })
  tableNumber: number;

  @IsUUID()
  @ApiProperty({
    description: 'Id do usuário que fez o pedido',
    example: '63d3d4cf-be70-4b86-830e-e14305dd328c',
  })
  userId: string;

  @IsUUID(undefined, { each: true })
  @ApiProperty({
    description: `Lista de id's dos produtos que estão sendo pedidos`,
    example: `['63d3d4cf-be70-4b86-830e-e14305dd328c', '63d3d4cf-be70-4b86-830e-e14305dd328c']`,
  })
  products: string[];
}