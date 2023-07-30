// import { Prisma } from '@prisma/client';

class StoreAddressUpdateInput {
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  country?: string | null;
  countryName?: string | null;
  postalCode?: string | null;
  state?: string | null;
  stateName?: string | null;
  // store?: StoreCreateNestedOneWithoutAddressInput
}
export class UpdateStoreDto {
  code: string;
  managerName?: string;
  address?: StoreAddressUpdateInput;
}

// export class UpdateStoreDto {
//   // addressLine1?: string | null
//   // addressLine2?: string | null
//   // city?: StringFieldUpdateOperationsInput | string
//   // country?: StringFieldUpdateOperationsInput | string
//   // countryName?: StringFieldUpdateOperationsInput | string
//   // postalCode?: string | null
//   // state?: string | null
//   // stateName?: string | null
//   // store?: StoreUpdateOneWithoutAddressNestedInput

//   addressLine1?: string | null
//   addressLine2?: string | null
//   city?: string
//   country?: string
//   countryName?: string
//   postalCode?: string | null
//   state?: string | null
//   stateName?: string | null
// }
