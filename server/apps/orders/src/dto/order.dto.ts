import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field()
  shippingAddress: string;

  @Field(() => [OrderItemInput])
  orderItems: OrderItemInput[];
}

@InputType()
export class UpdateOrderInput {
  @Field({ nullable: true })
  shippingAddress?: string;

  @Field(() => Float, { nullable: true })
  totalAmount?: number;

  @Field({ nullable: true })
  status?: string;
}

@InputType()
export class OrderItemInput {
  @Field()
  productId: string;

  @Field()
  quantity: number;
}
