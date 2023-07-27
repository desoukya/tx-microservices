import { Args } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { Context, Info } from '@nestjs/graphql';
import { PrismaConnector } from 'tx-shared-connectors';
import { AppContext } from 'tx-shared-interfaces';
import { Store as StoreModel } from '@prisma/client';
import { CreateStoreDto } from 'tx-shared-interfaces';

@Injectable()
export class StoresService {
  constructor(private readonly db: PrismaConnector) { }
  create(
    @Context() _context: AppContext,
    @Info() _info,
    _language: string,
    @Args('input') input: CreateStoreDto,
  ): Promise<StoreModel> {
    console.log('[createStore service]', input)
    const { code, managerName, address } = input;
    return this.db.store.create({ 
      data: {
        code,
        managerName,
        address: {
          create: { ...address }
        }
      },
      include: {
        address: true
      }
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
      include: { address: true }      
    });
  }

  getMany(@Context() _context: AppContext, @Info() _info, _language: string): Promise<StoreModel[]> {
    return this.db.store.findMany({ include: { address: true }});
  }
}
