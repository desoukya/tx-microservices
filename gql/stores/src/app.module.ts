import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { StoresQueryResolver } from './resolvers/Query';
import { StoresMutationResolver } from './resolvers/Mutation';
import { StoresService } from './services/stores.service';
import { ContextMiddleware } from 'tx-shared-middleware';
import { ResponseInterceptor } from 'tx-shared-interceptors';
import { PrismaConnector } from 'tx-shared-connectors';
import { ListDirective } from 'tx-shared-directives';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `config/${process.env.NODE_ENV}.env`, isGlobal: true }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['**/*.graphql'],
      context: ({ req, res }) => ({ req, res }),
      // formatResponse: (response) => ({ ...response, pagination: { page: 1, perPage: 100 } })
      formatResponse: (response) => {
        console.log('formatResponse', response);
        if (!response.extensions) {
          response.extensions = {
            pagination: { page: 1, perPage: 100 },
          };
        }
        response.extensions.code_version = '10.9.0';
        return response;
      },
      introspection: false,
      transformSchema: (schema) => ListDirective(schema, 'list'),
    }),
  ],
  providers: [
    StoresQueryResolver,
    StoresMutationResolver,
    StoresService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    PrismaConnector,
  ],
})
export class StoresModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware).forRoutes('/graphql');
  }
}
