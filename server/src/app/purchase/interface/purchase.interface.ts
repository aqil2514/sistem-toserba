export type PurchaseType = 'stock' | 'assets' | 'consumable';
export type PurchaseStatus =
  | 'ordered'
  | 'partially_received'
  | 'received'
  | 'cancelled';

export interface Purchase<T = unknown> {
  id: string;

  purchase_date: string;

  supplier_name: string;

  notes: string | null;

  created_at: string | null;

  purchase_code: string;

  supplier_type: string;

  deleted_at: string | null;

  purchase_type: PurchaseType;

  meta?: T;

  purchase_status: PurchaseStatus;

  updated_at: string;
}

export type PurchaseInsert = Omit<Purchase, 'id' | 'created_at' | 'deleted_at'>;
