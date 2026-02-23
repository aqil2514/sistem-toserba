export interface PurchaseAssetsDb {
  id: string;
  purchase_id: string;
  asset_name: string;
  unit_count: number;
  unit_price: number;
  total_price: number;
  condition: string;
  created_at: string;
  deleted_at: string;
}

export type PurchaseAssetsDbInsert = Omit<
  PurchaseAssetsDb,
  'id' | 'created_at' | 'deleted_at'
>;
