// import { Prisma } from '@prisma/client';

class StoreAddressCreateInput {
  addressLine1?: string | null;
  addressLine2?: string | null;
  city: string;
  country: string;
  countryName: string;
  postalCode?: string | null;
  state?: string | null;
  stateName?: string | null;
  // store?: StoreCreateNestedOneWithoutAddressInput
}
export class CreateStoreDto {
  code: string;
  managerName: string;
  address: StoreAddressCreateInput;
}
