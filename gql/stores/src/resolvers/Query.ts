import { Args, Query, Resolver, Context, Info, ResolveReference } from '@nestjs/graphql';
import { StoresService } from '../services/stores.service';
import { AppContext } from 'tx-shared-interfaces';
import { Store as StoreModel } from '@prisma/stores';
import { PAGE_OFFSET, PAGE_SIZE } from '../constants/pagination';

@Resolver('Store')
export class StoresQueryResolver {
  constructor(private readonly storesService: StoresService) {}

  @Query()
  store(
    @Context() context: AppContext,
    @Info() info,
    @Args('language') language: string,
    @Args('input') input: Pick<StoreModel, 'id'>,
  ): Promise<StoreModel> {
    return this.storesService.get(context, info, language, input);
  }

  @Query()
  stores(
    @Context() context: AppContext,
    @Info() info,
    @Args('language') language: string,
    @Args('skip') skip: number = PAGE_OFFSET,
    @Args('take') take: number = PAGE_SIZE,
  ): Promise<StoreModel[]> {
    return this.storesService.getMany(context, info, language, skip, take);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.storesService.get(null, null, null, { id: reference.id });
  }
}
