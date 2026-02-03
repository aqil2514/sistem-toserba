export type CashflowCategoryStatus = 'expense' | 'transfer' | 'income';

export interface CashflowDb {
  id: string;
  created_at: string;
  transaction_at: string;
  status_cashflow: CashflowCategoryStatus;
  product_service: string;
  category: string;
  via: string;
  price: number;
  note: string;
  deleted_at?: string;
  transfer_group_id?: string;
}

export type CashflowDbInsert = Omit<CashflowDb, 'id' | 'created_at'>;
