
export interface CashflowCategoryDb {
  id: string;
  created_at: string;
  name: string;
  description?: string;
  deleted_at?:string;
}

export type CashflowCategoryInsert = Omit<CashflowCategoryDb, "id" | "created_at">