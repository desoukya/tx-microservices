import { Args } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { Context, Info } from '@nestjs/graphql';
// import { PrismaConnector } from 'tx-shared-connectors';
import { PrismaConnector } from '../prisma/prisma.service';
import { AppContext, CreateStoreDto, UpdateStoreDto } from 'tx-shared-interfaces';
// import { Store as StoreModel } from '@tx/connectors/prisma';
// import { Store as StoreModel } from '../prisma/generated/client';
import { Store as StoreModel } from '@prisma/stores';

@Injectable()
export class StoresService {
  constructor(private db: PrismaConnector) {}

  create(
    @Context() _context: AppContext,
    @Info() _info,
    _language: string,
    @Args('input') input: CreateStoreDto,
  ): Promise<StoreModel> {
    console.log('[createStore service]', input);
    const { code, managerName, address } = input;
    return this.db.store.create({
      data: {
        code,
        managerName,
        address: {
          create: { ...address },
        },
      },
      include: {
        address: true,
      },
    });
  }

  update(
    @Context() _context: AppContext,
    @Info() _info,
    _language: string,
    @Args('input') input: UpdateStoreDto,
  ): Promise<StoreModel> {
    console.log('[updateStore service]', input);
    const { code, managerName, address } = input;
    return this.db.store.update({
      where: {
        code: input.code,
      },
      data: {
        code,
        managerName,
        address: {
          update: { ...address },
        },
      },
      include: {
        address: true,
      },
    });
  }

  get(
    @Context() _context: AppContext,
    @Info() _info,
    _language: string,
    input: Pick<StoreModel, 'code'>,
  ): Promise<StoreModel> {
    return this.db.store.findUnique({
      where: { code: input.code },
      include: { address: true },
    });
  }

  getMany(
    @Context() _context: AppContext,
    @Info() _info,
    _language: string,
    @Args('skip') skip: number,
    @Args('take') take: number,
  ): Promise<StoreModel[]> {
    return this.db.store.findMany({
      skip,
      take,
      include: { address: true },
    });
  }
}
