export interface PurchaseConsumablesDb {
  id: string;
  purchase_id: string;
  consumable_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
  deleted_at: string;
}

export type PurchaseConsumablesDbInsert = Omit<
  PurchaseConsumablesDb,
  'id' | 'created_at' | 'deleted_at'
>;
