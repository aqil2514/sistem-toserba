import { PurchaseStatus } from "../purchase";

export type PurchaseAssetsCondition = "new" | "second" | "damaged";

export interface PurchaseAssetsDb {
  id: string;
  purchase_id: string;
  asset_name: string;
  unit_count: number;
  unit_price: number;
  total_price: number;
  condition: PurchaseAssetsCondition;
  created_at: string;
  deleted_at: string;
}

export interface PurchaseAssetsDbPopulated extends Omit<
  PurchaseAssetsDb,
  "purchase_id"
> {
  purchase: {
    supplier_name:string;
    purchase_date: string;
    notes: string;
    purchase_code: string;
    purchase_status: PurchaseStatus;
    supplier_type: string;
  };
}

export type PurchaseAssetsDbInsert = Omit<
  PurchaseAssetsDb,
  "id" | "created_at" | "deleted_at"
>;
