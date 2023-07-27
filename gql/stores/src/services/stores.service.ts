import { Injectable } from '@nestjs/common';
import { Context, Info } from '@nestjs/graphql';
import { PrismaConnector } from 'tx-shared-connectors';
import { AppContext } from 'tx-shared-interfaces';
import { Store as StoreModel } from '@prisma/client';

@Injectable()
export class StoresService {
  constructor(private readonly db: PrismaConnector) {}
  create(
    @Context() _context: AppContext,
    @Info() _info,
    _language: string,
    input: Omit<StoreModel, 'id'>,
  ): Promise<StoreModel> {
    return this.db.store.create({ data: input });
  }

  get(
    @Context() _context: AppContext,
    @Info() _info,
    _language: string,
    input: Pick<StoreModel, 'code'>,
  ): Promise<StoreModel> {
    return this.db.store.findUnique({
      where: { code: input.code },
    });
  }

  getMany(@Context() _context: AppContext, @Info() _info, _language: string): Promise<StoreModel[]> {
    return this.db.store.findMany();
  }
}
