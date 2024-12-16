import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async create(data: {
    imageUrl: string;
    name: string;
    price: number;
    type: string;
    netWeight: number;
  }) {
    return this.prisma.product.create({ data });
  }

  async update(
    id: string,
    data: Partial<{ imageUrl: string; name: string; price: number }>,
  ) {
    return this.prisma.product.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}
