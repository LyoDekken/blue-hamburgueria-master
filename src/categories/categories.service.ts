import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { Categorie } from './entities/categorie.entity';
import { handleErrorConstraintUnique } from 'src/utils/handle-error-unique.util';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCategorieDto): Promise<Categorie> {
    return this.prisma.categorie
      .create({ data: dto })
      .catch(handleErrorConstraintUnique);
  }

  findAll(): Promise<Categorie[]> {
    return this.prisma.categorie.findMany();
  }

  async verifyIdAndReturnCategorie(id: string): Promise<Categorie> {
    const categorie: Categorie = await this.prisma.categorie.findUnique({
      where: { id },
    });

    if (!categorie) {
      throw new NotFoundException(`Entrada de id '${id}' não encontrada`);
    }

    return categorie;
  }

  findOne(id: string): Promise<Categorie> {
    return this.verifyIdAndReturnCategorie(id);
  }

  async update(id: string, dto: UpdateCategorieDto): Promise<Categorie> {
    await this.verifyIdAndReturnCategorie(id);

    return this.prisma.categorie
      .update({ where: { id }, data: dto })
      .catch(handleErrorConstraintUnique);
  }

  async remove(id: string) {
    await this.verifyIdAndReturnCategorie(id);

    return this.prisma.categorie.delete({
      where: { id },
      select: { name: true },
    });
  }
}