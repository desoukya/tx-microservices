import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { StoresQueryResolver } from './resolvers/Query';
import { StoresMutationResolver } from './resolvers/Mutation';
import { OrderService } from './services/order.service';
import { ContextMiddleware } from 'tx-shared-middleware';
import { ResponseInterceptor } from 'tx-shared-interceptors';
import { PrismaConnector } from './prisma/prisma.service';
import { PAGE_OFFSET, PAGE_SIZE } from './constants/pagination';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `config/${process.env.NODE_ENV}.env`, isGlobal: true }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['**/*.graphql'],
      context: ({ req, res }) => ({ req, res }),
      formatResponse: (response, request) => {
        if (
          response?.data &&
          Object.keys(response?.data).some((propertyName) => Array.isArray(response?.data[propertyName]))
        ) {
          const { skip = PAGE_OFFSET + 1, take = PAGE_SIZE } = request?.request.variables;
          const page = Math.floor(skip / take) + 1;
          const perPage = take;
          response.extensions = {
            pagination: { page, perPage },
            code_version: '0.1.0',
          };
        }
        return response;
      },
      introspection: false,
    }),
  ],
  providers: [
    StoresQueryResolver,
    StoresMutationResolver,
    OrderService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    PrismaConnector,
  ],
})
export class OrderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware).forRoutes('/graphql');
  }
}
