import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { Categorie } from './entities/categorie.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateCategorieDto): Promise<Categorie> {
    return this.prisma.categorie.create({ data: dto });
  }

  findAll(): Promise<Categorie[]> {
    return this.prisma.categorie.findMany();
  }

  findOne(id: string): Promise<Categorie> {
    return this.prisma.categorie.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateCategorieDto): Promise<Categorie> {
    return this.prisma.categorie.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.categorie.delete({
      where: { id },
      select: { name: true },
    });
  }
}
