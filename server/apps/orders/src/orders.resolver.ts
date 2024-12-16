import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveReference,
} from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput, UpdateOrderInput } from './dto/order.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  // @Query(() => [Order], { name: 'orders' })
  // async findAll() {
  //   return this.ordersService.findAll();
  // }

  // @Query(() => Order, { name: 'order', nullable: true })
  // async findOne(@Args('id', { type: () => String }) id: string) {
  //   return this.ordersService.findOne(id);
  // }

  @Mutation(() => Order)
  @UseGuards(AuthGuard)
  async createOrder(@Args('createOrderInput') input: CreateOrderInput) {
    return this.ordersService.create(input);
  }

  // @Mutation(() => Order)
  // async updateOrder(
  //   @Args('id', { type: () => String }) id: string,
  //   @Args('input') input: UpdateOrderInput,
  // ) {
  //   return this.ordersService.update(id, input);
  // }

  // @Mutation(() => Order)
  // async deleteOrder(@Args('id', { type: () => String }) id: string) {
  //   return this.ordersService.delete(id);
  // }

  // @ResolveReference()
  // resolveReference(reference: { __typename: string; id: string }) {
  //   return this.ordersService.findOne(reference.id);
  // }
}
