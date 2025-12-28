export interface Purchase {
  id: string; // uuid
  purchase_date: string; // ISO timestamp
  supplier_name: string | null;
  supplier_type: string | null;
  notes: string | null;
  purchase_code: string | null;

  created_at: string;
  deleted_at: string | null;
}
