import { Prisma } from '@prisma/client';

export class UpdateStoreDto {
  code: string;
  managerName?: string;
  address?: Prisma.StoreAddressUpdateInput;
}
