import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class OrderItem {
  @Field(() => ID)
  id: string;

  @Field()
  productId: string;

  @Field()
  quantity: number;

  @Field()
  totalPrice: number;
}

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  shippingAddress: string;

  @Field(() => Float)
  totalAmount: number;

  @Field()
  status: string;

  @Field(() => [OrderItem])
  orderItems: OrderItem[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
