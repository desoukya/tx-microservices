import { Args } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { Context, Info } from '@nestjs/graphql';
// import { PrismaConnector } from 'tx-shared-connectors';
import { PrismaConnector } from '../prisma/prisma.service';
import { AppContext, CreateOrderDto, UpdateOrderDto } from 'tx-shared-interfaces';
import { Order as OrderModel } from '@prisma/orders';

@Injectable()
export class OrderService {
  constructor(private db: PrismaConnector) {}

  create(
    @Context() _context: AppContext,
    @Info() _info,
    _language: string,
    @Args('input') input: CreateOrderDto,
  ): Promise<OrderModel> {
    console.log('[createOrder service]', input);
    return this.db.order.create({
      data: {
        ...input,
      },
    });
  }

  update(
    @Context() _context: AppContext,
    @Info() _info,
    _language: string,
    @Args('input') input: UpdateOrderDto,
  ): Promise<OrderModel> {
    console.log('[updateOrder service]', input);
    const { id, ...rest } = input;
    return this.db.order.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    });
  }

  get(
    @Context() _context: AppContext,
    @Info() _info,
    _language: string,
    input: Pick<OrderModel, 'id'>,
  ): Promise<OrderModel> {
    return this.db.order.findUnique({
      where: { id: input.id },
    });
  }

  getMany(
    @Context() _context: AppContext,
    @Info() _info,
    _language: string,
    @Args('skip') skip: number,
    @Args('take') take: number,
  ): Promise<OrderModel[]> {
    return this.db.order.findMany({
      skip,
      take,
    });
  }
}
