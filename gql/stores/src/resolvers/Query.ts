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
import { AppContext, Store } from 'tx-shared-interfaces';

@Resolver()
export class StoresQueryResolver {
  constructor(private readonly storesService: StoresService) {}

  @Query('store')
  store(
    @Context() context: AppContext,
    @Info() info,
    @Args('language') language: string,
    @Args('input') input: Pick<Store, 'code'>,
  ): Promise<Store> {
    console.log('store query resolver', language, input);
    // console.log('info', JSON.stringify(info))
    return this.storesService.get(context, info, language, input);
  }

  @Query('stores')
  stores(
    @Context() context: AppContext,
    @Info() info,
    @Args('language') language: string,
    @Args('input') input: Pick<Store, 'code'>,
    // @Args('first') _first: number,
    // @Args('skip') _skip: number,
  ): Promise<Store[]> {
    console.log('stores get many query resolver', language, input);
    console.log('info', JSON.stringify(info));
    return this.storesService.getMany(context, info, language, input);
  }
}
