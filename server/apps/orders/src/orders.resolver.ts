import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/order.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => Order)
  @UseGuards(AuthGuard)
  async createOrder(
    @Args('createOrderInput') input: CreateOrderInput,
    @Context() context: { req: Request },
  ) {
    return this.ordersService.create(input, context.req);
  }

  @Query(() => [Order], { name: 'userOrders' })
  @UseGuards(AuthGuard)
  async userOrders(@Context() context: { req: Request }) {
    return this.ordersService.findAllUserOrders(context.req);
  }
}
