import { BasicQuery } from '../../../@types/general';

export type ToggleColumnKey = 'sales_code' | 'customer_name' | 'payment_method';

export interface SalesQuery extends BasicQuery {
  toggleColumnKey?: ToggleColumnKey;
  toggleColumnValue?: string;
  sortedKey?: string;
  sortedValue?: string;
}
