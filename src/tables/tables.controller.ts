import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Table } from './entities/table.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('tables')
@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  @ApiOperation({
    summary: 'Cria uma nova mesa',
  })
  create(@Body() dto: CreateTableDto): Promise<Table> {
    return this.tablesService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lista todas as mesas',
  })
  findAll(): Promise<Table[]> {
    return this.tablesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lista uma mesa',
  })
  findOne(@Param('id') id: string): Promise<Table> {
    return this.tablesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualiza uma mesa',
  })
  update(@Param('id') id: string, @Body() dto: UpdateTableDto): Promise<Table> {
    return this.tablesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Exclui uma mesa',
  })
  remove(@Param('id') id: string) {
    return this.tablesService.remove(id);
  }
}