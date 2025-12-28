export interface PurchaseItem {
  id: string; // uuid
  purchase_id: string; // fk -> purchases.id
  product_id: string; // fk -> products.id

  quantity: number;
  remaining_quantity: number;

  price: number; // numeric(12,2)
  hpp: number | null;

  product_name: string | null;

  created_at: string;
  deleted_at: string | null;
}
