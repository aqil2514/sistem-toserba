export type CashflowCategoryStatus = "expense" | "transfer" | "income"

export interface CashflowCategoryDb {
  id: string;
  created_at: string;
  name: string;
  status: CashflowCategoryStatus;
  description: string;
}
