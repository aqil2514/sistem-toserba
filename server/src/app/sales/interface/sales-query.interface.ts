export type ToggleColumnKey = 'sales_code' | 'customer_name' | 'payment_method';

export interface SalesQuery {
  page: number;
  limit: number;
  from?: string;
  to?: string;
  toggleColumnKey?: ToggleColumnKey;
  toggleColumnValue?: string;
  sortedKey?: string;
  sortedValue?: string;
}
