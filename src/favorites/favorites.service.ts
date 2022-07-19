import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entity/users.entity';
import { handleErrorConstraintUnique } from 'src/utils/handle-error-unique.util';
import { FavoriteProductDto } from './dto/favorite-product.dto';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async favoriteProduct(dto: FavoriteProductDto): Promise<Favorite> {
    await this.verifyUserId(dto.userId);

    const product: Product = await this.prisma.product.findUnique({
      where: { name: dto.productName },
    });

    if (!product) {
      throw new NotFoundException(
        `Produto de nome '${dto.productName}' não encontrado`,
      );
    }

    const data: Prisma.FavoriteCreateInput = {
      user: {
        connect: {
          id: dto.userId,
        },
      },
      product: {
        connect: {
          name: dto.productName,
        },
      },
    };

    return this.prisma.favorite
      .create({ data })
      .catch(handleErrorConstraintUnique);
  }

  async unfavoriteProduct(id: string) {
    const favorite: Favorite = await this.prisma.favorite.findUnique({
      where: { id },
    });

    if (!favorite) {
      throw new NotFoundException(`Entrada de id '${id}' não encontrada`);
    }

    return this.prisma.favorite.delete({ where: { id } });
  }

  async getUserFavorites(id: string): Promise<Favorite[]> {
    await this.verifyUserId(id);

    return this.prisma.favorite.findMany({ where: { userId: id } });
  }

  async getUsersWhoFavoritedProduct(id: string) {
    const product: Product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Entrada de id '${id}' não encontrada`);
    }

    return this.prisma.favorite.findMany({ where: { product: { id } } });
  }

  async verifyUserId(id: string): Promise<void | never> {
    const user: User = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Entrada de id '${id}' não encontrada`);
    }
  }
}