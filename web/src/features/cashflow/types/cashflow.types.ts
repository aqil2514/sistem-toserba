import { CashflowCategoryDb } from "./cashflow-category.types";

export interface CashflowDb {
  category: CashflowCategoryDb;
  created_at: string;
  deleted_at:string;
  id: string;
  note: string;
  price: number;
  product_service: string;
  transaction_at: string;
  via: string;
}
