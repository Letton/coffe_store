import { ObjectType, Field, ID, Float, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  imageUrl: string;

  @Field()
  name: string;

  @Field()
  netWeight: number;

  @Field()
  type: string;

  @Field(() => Float)
  price: number;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
