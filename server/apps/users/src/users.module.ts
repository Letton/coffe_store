import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersResolver } from './users.resolver';
import { PrismaService } from '../../../prisma/prisma.service';
import { EmailModule } from './email/email.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    EmailModule,
  ],
  controllers: [],
  providers: [
    UsersService,
    ConfigService,
    JwtService,
    UsersResolver,
    PrismaService,
  ],
})
export class UsersModule {}
