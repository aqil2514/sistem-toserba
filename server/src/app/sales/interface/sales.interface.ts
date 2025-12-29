export interface SalesDb {
  id: string;
  sales_code: string;
  total_amount: number;
  payment_method: string;
  customer_name: string;
  notes: string;
  created_at: string;
  transaction_at: string;
  deleted_at: string;
}

export type SalesDbInsert = Omit<SalesDb, 'id' | 'created_at' | 'deleted_at'>;
