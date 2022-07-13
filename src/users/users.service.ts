import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/users.entity';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { handleErrorConstraintUnique } from 'src/utils/handle-error-unique.util';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User | void> {
    const hashedPassword = await bcrypt.hash(dto.password, 8);

    const data: CreateUserDto = {
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    };

    return this.prisma.user.create({ data }).catch(handleErrorConstraintUnique);
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async verifyIdAndReturnUser(id: string): Promise<User> {
    const user: User = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Entrada de id '${id}' não encontrada`);
    }

    return user;
  }

  findOne(id: string): Promise<User> {
    return this.verifyIdAndReturnUser(id);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User | void> {
    await this.verifyIdAndReturnUser(id);

    return this.prisma.user
      .update({ where: { id }, data: dto })
      .catch(handleErrorConstraintUnique);
  }

  async remove(id: string) {
    await this.verifyIdAndReturnUser(id);

    return this.prisma.user.delete({
      where: { id },
      select: { name: true, email: true },
    });
  }
}
