import { Prisma } from '@prisma/client';

export class CreateStoreDto {
  code: string;
  managerName: string;
  address: Prisma.StoreAddressCreateInput;
}
