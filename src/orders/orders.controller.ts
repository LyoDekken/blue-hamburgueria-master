import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um novo pedido',
  })
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os pedidos',
  })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Listar pedido por id',
  })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }
}