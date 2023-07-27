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
import { AppContext } from 'tx-shared-interfaces';
import { Store as StoreModel } from '@prisma/client';
import { CreateStoreDto } from 'tx-shared-interfaces';

@Resolver()
export class StoresMutationResolver {
  constructor(private readonly storesService: StoresService) {}

  @Mutation('createStore')
  createStore(
    @Context() context: AppContext,
    @Info() info,
    @Args('language') language: string,
    @Args('input') input: CreateStoreDto,
  ): Promise<StoreModel> {
    return this.storesService.create(context, info, language, input);
  }
}
