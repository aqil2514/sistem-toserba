import { CashflowCategoryDb } from "./cashflow-category.types";
export type CashflowCategoryStatus = "expense" | "transfer" | "income";

export interface CashflowDb {
  category: CashflowCategoryDb;
  created_at: string;
  deleted_at:string;
  id: string;
  note: string;
  price: number;
  product_service: string;
  status_cashflow: CashflowCategoryStatus;
  transaction_at: string;
  via: string;
  transfer_group_id?: string;
}
