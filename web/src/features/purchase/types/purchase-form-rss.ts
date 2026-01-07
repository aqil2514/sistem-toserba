export interface PurchaseFormRss {
  supplier: {
    supplierName: string[];
    supplierType: string[];
  };
  products: {
    id: string;
    name: string;
  }[];
}
