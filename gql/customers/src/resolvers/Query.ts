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
import { CustomerService } from '../services/customer.service';
import { AppContext } from 'tx-shared-interfaces';
import { Customer as CustomerModel } from '@prisma/client';
import { PAGE_OFFSET, PAGE_SIZE } from '../constants/pagination';

@Resolver()
export class StoresQueryResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query('customer')
  customer(
    @Context() context: AppContext,
    @Info() info,
    @Args('language') language: string,
    @Args('input') input: Pick<CustomerModel, 'id'>,
  ): Promise<CustomerModel> {
    return this.customerService.get(context, info, language, input);
  }

  @Query('customers')
  customers(
    @Context() context: AppContext,
    @Info() info,
    @Args('language') language: string,
    @Args('skip') skip: number = PAGE_OFFSET,
    @Args('take') take: number = PAGE_SIZE,
  ): Promise<CustomerModel[]> {
    return this.customerService.getMany(context, info, language, skip, take);
  }
}
