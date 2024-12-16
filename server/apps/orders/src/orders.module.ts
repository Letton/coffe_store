import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { PrismaService } from '../../../prisma/prisma.service';
import { ProductsService } from 'apps/products/src/products.service';
import { ProductsResolver } from 'apps/products/src/products.resolver';
import { JwtService } from '@nestjs/jwt';

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
  providers: [
    ProductsResolver,
    ProductsService,
    PrismaService,
    ConfigService,
    JwtService,
  ],
})
export class ProductsModule {}
