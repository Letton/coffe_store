import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveReference,
} from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { CreateProductInput, UpdateProductInput } from './dto/product.dto';
import { Product } from './entities/product.entity';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product], { name: 'products' })
  async findAll() {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product', nullable: true })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  async createProduct(@Args('input') input: CreateProductInput) {
    return this.productsService.create(input);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id', { type: () => String }) id: string,
    @Args('input') input: UpdateProductInput,
  ) {
    return this.productsService.update(id, input);
  }

  @Mutation(() => Product)
  async deleteProduct(@Args('id', { type: () => String }) id: string) {
    return this.productsService.delete(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.productsService.findOne(reference.id);
  }
}
