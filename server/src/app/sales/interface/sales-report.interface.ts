import { BasicQuery } from '../../../@types/general';

export type DataMode = 'summary-product' | 'full';

export interface SalesReportQuery extends BasicQuery {
  mode: DataMode;
}

export interface SalesReportProductRpcParams {
  p_page: number;
  p_limit: number;
  p_start_utc: string;
  p_end_utc?: string;
  p_product_name?: string;
  p_sort_by: string;
  p_sort_dir: 'asc' | 'desc';
}

export interface SalesReportProductRpcReturn {
  product_name: string;
  quantity: number;
  hpp: number;
  margin: number;
  subtotal: number;
  discount: number;
  tip: number;
  markup_percent: number;
  margin_percent: number;
}
