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
import { CustomerService } from '../services/customer.service';
import { AppContext } from 'tx-shared-interfaces';
import { Customer as CustomerModel } from '@prisma/client';
import { CreateCustomerDto, UpdateCustomerDto } from 'tx-shared-interfaces';

@Resolver()
export class StoresMutationResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Mutation('createCustomer')
  createCustomer(
    @Context() context: AppContext,
    @Info() info,
    @Args('language') language: string,
    @Args('input') input: CreateCustomerDto,
  ): Promise<CustomerModel> {
    return this.customerService.create(context, info, language, input);
  }

  @Mutation('updateCustomer')
  updateCustomer(
    @Context() context: AppContext,
    @Info() info,
    @Args('language') language: string,
    @Args('input') input: UpdateCustomerDto,
  ): Promise<CustomerModel> {
    return this.customerService.update(context, info, language, input);
  }
}
