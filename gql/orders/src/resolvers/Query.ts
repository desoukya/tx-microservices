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
import { OrderService } from '../services/order.service';
import { AppContext } from 'tx-shared-interfaces';
import { Order as OrderModel } from '@prisma/orders';
import { PAGE_OFFSET, PAGE_SIZE } from '../constants/pagination';

@Resolver()
export class StoresQueryResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query('order')
  order(
    @Context() context: AppContext,
    @Info() info,
    @Args('language') language: string,
    @Args('input') input: Pick<OrderModel, 'id'>,
  ): Promise<OrderModel> {
    return this.orderService.get(context, info, language, input);
  }

  @Query('orders')
  orders(
    @Context() context: AppContext,
    @Info() info,
    @Args('language') language: string,
    @Args('skip') skip: number = PAGE_OFFSET,
    @Args('take') take: number = PAGE_SIZE,
  ): Promise<OrderModel[]> {
    return this.orderService.getMany(context, info, language, skip, take);
  }
}
