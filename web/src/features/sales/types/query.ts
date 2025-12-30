export type ToggleColumnKey =  "sales_code" | "customer_name" | "payment_method";

export interface SalesQuery {
  page: number;
  limit: number;
  from?: Date;
  to?: Date;
  toggleColumnKey?: ToggleColumnKey;
  toggleColumnValue?: string;
}
