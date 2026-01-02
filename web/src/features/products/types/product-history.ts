export interface ProductHistory {
  id: string; // uuid

  purchase: {
    id: string;
    purchase_date: string;
    purchase_code: string;
    supplier_name: string;
  }; // uuid → purchases.id

  price: number; // numeric(12,2) → string (pg default)

  quantity: number; // integer

  remaining_quantity: number; // integer

  hpp: number; // numeric → string
}
