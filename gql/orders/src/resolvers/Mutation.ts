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
import { OrderService } from '../services/order.service';
import { AppContext } from 'tx-shared-interfaces';
import { Order as OrderModel } from '@prisma/orders';
import { CreateOrderDto, UpdateOrderDto } from 'tx-shared-interfaces';

@Resolver()
export class StoresMutationResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation('createOrder')
  createOrder(
    @Context() context: AppContext,
    @Info() info,
    @Args('language') language: string,
    @Args('input') input: CreateOrderDto,
  ): Promise<OrderModel> {
    return this.orderService.create(context, info, language, input);
  }

  @Mutation('updateOrder')
  updateOrder(
    @Context() context: AppContext,
    @Info() info,
    @Args('language') language: string,
    @Args('input') input: UpdateOrderDto,
  ): Promise<OrderModel> {
    return this.orderService.update(context, info, language, input);
  }
}
