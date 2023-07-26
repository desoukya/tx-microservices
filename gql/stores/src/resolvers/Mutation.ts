import {
  Args,
  // ID,
  // Parent,
  // ResolveField,
  Resolver,
  Context,
  Info,
  Mutation,
} from '@nestjs/graphql';
import { StoresService } from '../services/stores.service';
import { AppContext, Store } from 'tx-shared-interfaces';

@Resolver()
export class StoresMutationResolver {
  constructor(private readonly storesService: StoresService) {}

  @Mutation('createStore')
  createStore(
    @Context() context: AppContext,
    @Info() info,
    @Args('language') language: string,
    @Args('input') input: Omit<Store, 'id'>,
  ): Promise<Store> {
    console.log('stores mutation resolver', language, input);
    return this.storesService.create(context, info, language, input);
  }
}
