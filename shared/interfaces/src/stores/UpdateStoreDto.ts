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
  id: string;
  code?: string;
  managerName?: string;
  address?: StoreAddressUpdateInput;
}
