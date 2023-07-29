import { Args } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { Context, Info } from '@nestjs/graphql';
import { PrismaConnector } from 'tx-shared-connectors';
import { AppContext, CreateCustomerDto, UpdateCustomerDto } from 'tx-shared-interfaces';
import { Customer as CustomerModel } from '@prisma/client';

@Injectable()
export class CustomerService {
  constructor(private readonly db: PrismaConnector) {}

  create(
    @Context() _context: AppContext,
    @Info() _info,
    _language: string,
    @Args('input') input: CreateCustomerDto,
  ): Promise<CustomerModel> {
    console.log('[createStore service]', input);
    const { name } = input;
    return this.db.customer.create({
      data: {
        name,
      },
    });
  }

  update(
    @Context() _context: AppContext,
    @Info() _info,
    _language: string,
    @Args('input') input: UpdateCustomerDto,
  ): Promise<CustomerModel> {
    console.log('[updateStore service]', input);
    const { id, name } = input;
    return this.db.customer.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }

  get(
    @Context() _context: AppContext,
    @Info() _info,
    _language: string,
    input: Pick<CustomerModel, 'id'>,
  ): Promise<CustomerModel> {
    return this.db.customer.findUnique({
      where: { id: input.id },
    });
  }

  getMany(
    @Context() _context: AppContext,
    @Info() _info,
    _language: string,
    @Args('skip') skip: number,
    @Args('take') take: number,
  ): Promise<CustomerModel[]> {
    return this.db.customer.findMany({
      skip,
      take,
    });
  }
}
