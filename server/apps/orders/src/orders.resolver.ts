import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveReference,
} from '@nestjs/graphql';
import { OrdersService } from './orders.service';
// import { CreateProductInput, UpdateProductInput } from './dto/order.dto';
// import { Product } from './entities/order.entity';

@Resolver(() => Order)
export class ProductsResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => [Order], { name: 'products' })
  async findAll() {
    return this.ordersService.findAll();
  }

  @Query(() => Order, { name: 'product', nullable: true })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.ordersService.findOne(id);
  }

  @Mutation(() => Order)
  async createOrder(@Args('input') input: CreateOrderInput) {
    return this.ordersService.create(input);
  }

  @Mutation(() => Order)
  async updateOrder(
    @Args('id', { type: () => String }) id: string,
    @Args('input') input: UpdateOrder,
  ) {
    return this.ordersService.update(id, input);
  }

  @Mutation(() => Order)
  async deleteOrder(@Args('id', { type: () => String }) id: string) {
    return this.ordersService.delete(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.ordersService.findOne(reference.id);
  }
}
