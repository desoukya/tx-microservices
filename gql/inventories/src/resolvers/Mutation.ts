import { Args, Resolver, Context, Info, Mutation } from '@nestjs/graphql';
import { InventoryService } from '../services/inventory.service';
import { AppContext } from 'tx-shared-interfaces';
import { Inventory as InventoryModel } from '@prisma/inventories';
import { CreateInventoryDto, UpdateInventoryDto } from 'tx-shared-interfaces';

@Resolver()
export class StoresMutationResolver {
  constructor(private readonly inventoryService: InventoryService) {}

  @Mutation('createInventory')
  createInventory(
    @Context() context: AppContext,
    @Info() info,
    @Args('language') language: string,
    @Args('input') input: CreateInventoryDto,
  ): Promise<InventoryModel> {
    return this.inventoryService.create(context, info, language, input);
  }

  @Mutation('updateInventory')
  updateInventory(
    @Context() context: AppContext,
    @Info() info,
    @Args('language') language: string,
    @Args('input') input: UpdateInventoryDto,
  ): Promise<InventoryModel> {
    return this.inventoryService.update(context, info, language, input);
  }
}
