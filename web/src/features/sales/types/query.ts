export type ToggleColumnKey = "sales_code" | "customer_name" | "payment_method";

export type ToggleSortKey = ToggleColumnKey | "total_amount" | "transaction_at"

export interface SalesQuery {
  page: number;
  limit: number;
  from?: Date;
  to?: Date;
  toggleColumnKey?: ToggleColumnKey;
  toggleColumnValue?: string;
  sortedKey?: string;
  sortedValue?: string;
}
