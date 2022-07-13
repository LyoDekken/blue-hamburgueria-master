import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { Categorie } from './entities/categorie.entity';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({
    summary: 'Criação de categorias',
  })
  create(@Body() dto: CreateCategorieDto): Promise<Categorie> {
    return this.categoriesService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listagem de categorias',
  })
  findAll(): Promise<Categorie[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Listagem de uma categoria',
  })
  findOne(@Param('id') id: string): Promise<Categorie> {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualização de uma categoria',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCategorieDto,
  ): Promise<Categorie> {
    return this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Exclusão de uma categoria',
  })
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}