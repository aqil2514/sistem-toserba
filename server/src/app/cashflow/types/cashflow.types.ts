export type CashflowCategoryStatus =
  | 'expense'
  | 'transfer'
  | 'income'
  | 'receivable'
  | 'payable';

export interface CashflowDb<T = unknown> {
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
  source?: string;
  meta?: T;
}

export type CashflowDbInsert<T = unknown> = Omit<
  CashflowDb<T>,
  'id' | 'created_at'
>;

export interface ReceivableCashflowMeta {
  customer_name: string;
}

export interface PayableCashflowMeta {
  vendor_name: string;
}