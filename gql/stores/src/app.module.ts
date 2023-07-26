import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { StoresQueryResolver } from './resolvers/Query';
import { StoresMutationResolver } from './resolvers/Mutation';
import { StoresService } from './services/stores.service';
import { ContextMiddleware } from 'tx-shared-middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `config/${process.env.NODE_ENV}.env`, isGlobal: true }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['**/*.graphql'],
      context: ({ req, res }) => ({ req, res }),
    }),
  ],
  providers: [StoresQueryResolver, StoresMutationResolver, StoresService],
})
export class StoresModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware).forRoutes('/graphql');
  }
}
