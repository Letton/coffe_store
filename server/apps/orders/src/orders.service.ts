import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { OrderStatus, Prisma } from '@prisma/client';
import { CreateOrderInput } from './dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  // async findAll() {
  //   return this.prisma.order.findMany({
  //     include: { orderItems: true, user: true },
  //   });
  // }

  // async findOne(id: string) {
  //   return this.prisma.order.findUnique({
  //     where: { id },
  //     include: { orderItems: true, user: true },
  //   });
  // }

  async create(data: CreateOrderInput) {
    const { orderItems, userId, status, ...orderData } = data;

    await this.prisma.order.create({
      data: {
        ...orderData,
        status: status as OrderStatus,
        user: { connect: { id: userId } },
        orderItems: {
          create: orderItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            totalPrice: item.totalPrice,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });
    return null;
  }

  // async update(id: string, data: Prisma.OrderUpdateInput) {
  //   return this.prisma.order.update({
  //     where: { id },
  //     data,
  //   });
  // }

  // async delete(id: string) {
  //   return this.prisma.order.delete({
  //     where: { id },
  //   });
  // }
}
