export interface Purchase {
  id: string; // uuid

  purchase_date: string; // timestamp without time zone

  supplier_name: string | null;

  notes: string | null;

  created_at: string | null; // timestamp without time zone

  purchase_code: string | null;

  supplier_type: string | null;

  deleted_at: string | null; // timestamp with time zone
}

export type PurchaseInsert = Omit<Purchase, 'id' | 'created_at' | 'deleted_at'>;
