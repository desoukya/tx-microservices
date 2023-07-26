import { Injectable } from '@nestjs/common';
import { Context, Info } from '@nestjs/graphql';
import { AppContext, Store } from 'tx-shared-interfaces';

const sampleStore = Object.freeze({
  id: 1,
  address: {
    country: 'US',
    countryName: 'USA',
    city: 'Washington DC',
  },
  managerName: 'Amr Desouky',
});

@Injectable()
export class StoresService {
  create(@Context() _context: AppContext, @Info() _info, language: string, input: Omit<Store, 'id'>): Promise<Store> {
    console.log('creating store', language, input);
    return new Promise((resolve) =>
      resolve({
        id: 1,
        ...input,
      }),
    );
  }

  get(@Context() _context: AppContext, @Info() _info, language: string, input: Pick<Store, 'code'>): Promise<Store> {
    console.log('get store', language, input);
    return new Promise((resolve) =>
      resolve({
        code: input.code,
        ...sampleStore,
      }),
    );
  }

  getMany(
    @Context() _context: AppContext,
    @Info() _info,
    language: string,
    input: Pick<Store, 'code'>,
  ): Promise<Store[]> {
    console.log('get many stores', language, input);
    return new Promise((resolve) =>
      resolve([
        {
          code: input.code,
          ...sampleStore,
        },
      ]),
    );
  }
}
