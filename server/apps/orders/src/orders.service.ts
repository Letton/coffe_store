import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { OrderStatus, Prisma } from '@prisma/client';
import { CreateOrderInput } from './dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateOrderInput, req: any) {
    const { orderItems, ...orderData } = data;

    const productIds = orderItems.map((item) => item.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, price: true },
    });

    let totalAmount = 0;
    const updatedOrderItems = orderItems.map((item) => {
      const product = products.find((product) => product.id === item.productId);
      const totalPrice = product
        ? (product.price as unknown as number) * item.quantity
        : 0;
      totalAmount += totalPrice;
      return {
        productId: item.productId,
        quantity: item.quantity,
        totalPrice,
      };
    });

    return this.prisma.order.create({
      data: {
        ...orderData,
        status: OrderStatus.PENDING,
        user: { connect: { id: req.user.id } },
        totalAmount: totalAmount,
        orderItems: {
          create: updatedOrderItems,
        },
      },
      include: {
        orderItems: true,
      },
    });
  }

  async findAllUserOrders(req: any) {
    return this.prisma.order.findMany({
      where: { userId: req.user.id },
    });
  }
}
