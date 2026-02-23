export interface PurchaseItem {
  id: string; // uuid

  purchase_id: string; // uuid → purchases.id

  product_id: string; // uuid → products.id

  quantity: number; // integer

  remaining_quantity: number; // integer

  price: number; // numeric(12,2) → string (pg default)

  created_at: string | null; // timestamp without time zone

  hpp: number; // numeric → string

  product_name: string | null;

  deleted_at: string | null; // timestamp with time zone
}

export type PurchaseItemInsert = Omit<
  PurchaseItem,
  'id' | 'created_at' | 'deleted_at'
>;
