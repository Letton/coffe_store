import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    if (context?.req?.headers) {
      request.http.headers.set(
        'accesstoken',
        context.req.headers.accesstoken || '',
      );
      request.http.headers.set(
        'refreshtoken',
        context.req.headers.refreshtoken || '',
      );
    }
  }
}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'users', url: 'http://localhost:4001/graphql' },
            { name: 'products', url: 'http://localhost:4002/graphql' },
          ],
        }),
        buildService({ url }) {
          return new AuthenticatedDataSource({ url });
        },
      },
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
