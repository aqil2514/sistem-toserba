import { CashflowCategoryDb } from "./cashflow-category.types";
export type CashflowCategoryStatus =
  | "expense"
  | "transfer"
  | "income"
  | "receivable"
  | "payable";

export interface CashflowDb<T = unknown> {
  id: string;
  created_at: string;
  transaction_at: string;
  status_cashflow: CashflowCategoryStatus;
  product_service: string;
  category: CashflowCategoryDb;
  via: string;
  price: number;
  note: string;
  deleted_at?: string;
  transfer_group_id?: string;
  source?: string;
  meta?: T;
}

export interface CashflowRpcReturn {
  id: string;
  transaction_at: string;
  product_service: string;
  cashflow_category: string;
  status_cashflow: CashflowCategoryStatus;
  via: string;
  price: number;
  transfer_group_id?: string;
}

export interface ReceivableCashflowMeta {
  customer_name: string;
}

export interface PayableCashflowMeta {
  vendor_name: string;
}