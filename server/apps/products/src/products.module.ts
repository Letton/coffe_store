import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ProductsResolver } from './products.resolver';
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
  ],
  providers: [ProductsResolver, ProductsService, PrismaService],
})
export class ProductsModule {}
