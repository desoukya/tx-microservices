import {
  Args,
  // ID,
  // Parent,
  Query,
  // ResolveField,
  Resolver,
  Context,
  Info,
} from '@nestjs/graphql';
import { StoresService } from '../services/stores.service';
import { AppContext} from 'tx-shared-interfaces';
import { Store as StoreModel } from '@prisma/client';
import { PAGE_OFFSET, PAGE_SIZE } from '../constants/pagination';

@Resolver()
export class StoresQueryResolver {
  constructor(private readonly storesService: StoresService) {}

  @Query('store')
  store(
    @Context() context: AppContext,
    @Info() info,
    @Args('language') language: string,
    @Args('input') input: Pick<StoreModel, 'code'>,
  ): Promise<StoreModel> {
    return this.storesService.get(context, info, language, input);
  }

  @Query('stores')
  stores(
    @Context() context: AppContext,
    @Info() info,
    @Args('language') language: string,
    @Args('skip') skip: number = PAGE_OFFSET,
    @Args('take') take: number = PAGE_SIZE,
  ): Promise<StoreModel[]> {
    return this.storesService.getMany(context, info, language, skip, take);
  }
}
