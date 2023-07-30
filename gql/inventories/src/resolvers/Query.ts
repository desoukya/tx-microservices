import { Args, Query, ResolveReference, Resolver, Context, Info } from '@nestjs/graphql';
import { InventoryService } from '../services/inventory.service';
import { AppContext } from 'tx-shared-interfaces';
import { Inventory as InventoryModel } from '@prisma/inventories';
import { PAGE_OFFSET, PAGE_SIZE } from '../constants/pagination';

@Resolver('Inventory')
export class StoresQueryResolver {
  constructor(private readonly inventoryService: InventoryService) {}

  @Query()
  inventory(
    @Context() context: AppContext,
    @Info() info,
    @Args('language') language: string,
    @Args('input') input: Pick<InventoryModel, 'id'>,
  ): Promise<InventoryModel> {
    return this.inventoryService.get(context, info, language, input);
  }

  @Query()
  inventories(
    @Context() context: AppContext,
    @Info() info,
    @Args('language') language: string,
    @Args('skip') skip: number = PAGE_OFFSET,
    @Args('take') take: number = PAGE_SIZE,
  ): Promise<InventoryModel[]> {
    return this.inventoryService.getMany(context, info, language, skip, take);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.inventoryService.get(null, null, null, { id: reference.id });
  }
}
