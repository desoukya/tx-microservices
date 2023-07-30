import { Args } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { Context, Info } from '@nestjs/graphql';
import { PrismaConnector } from '../prisma/prisma.service';
import { AppContext, CreateInventoryDto, UpdateInventoryDto } from 'tx-shared-interfaces';
import { Inventory as InventoryModel } from '@prisma/inventories';

@Injectable()
export class InventoryService {
  constructor(private db: PrismaConnector) {}

  create(
    @Context() _context: AppContext,
    @Info() _info,
    _language: string,
    @Args('input') input: CreateInventoryDto,
  ): Promise<InventoryModel> {
    return this.db.inventory.create({
      data: {
        ...input,
      },
    });
  }

  update(
    @Context() _context: AppContext,
    @Info() _info,
    _language: string,
    @Args('input') input: UpdateInventoryDto,
  ): Promise<InventoryModel> {
    const { id, ...rest } = input;
    return this.db.inventory.update({
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
    input: Pick<InventoryModel, 'id'>,
  ): Promise<InventoryModel> {
    return this.db.inventory.findUnique({
      where: { id: input.id },
    });
  }

  getMany(
    @Context() _context: AppContext,
    @Info() _info,
    _language: string,
    @Args('skip') skip: number,
    @Args('take') take: number,
  ): Promise<InventoryModel[]> {
    return this.db.inventory.findMany({
      skip,
      take,
    });
  }
}
