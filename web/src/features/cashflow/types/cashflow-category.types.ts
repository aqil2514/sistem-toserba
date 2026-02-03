export type CashflowCategoryStatus = "expense" | "transfer" | "income"

export interface CashflowCategoryDb {
  created_at: string;
  deleted_at:string;
  description: string;
  id: string;
  name: string;
  status: CashflowCategoryStatus;
}