import { BasicQuery } from '../../../@types/general';

export type DataMode = 'summary-product' | 'full';
export type ReportContent = 'summary' | 'detail';

export interface SalesReportQuery extends BasicQuery {
  mode: DataMode;
  content: ReportContent;
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
  category: string;
  subcategory: string;
  quantity: number;
  hpp: number;
  margin: number;
  subtotal: number;
  discount: number;
  tip: number;
  markup_percent: number;
  margin_percent: number;
}

export interface SalesReportSummaryRpcParams {
  p_start_utc: string;
  p_end_utc?: string;
  p_buyer?: string;
  p_payment_method?: string;
  p_product_name?: string;
  p_product_category?: string;
  p_product_subcategory?: string;
}

export interface SalesReportSummaryRpcReturn {
  omzet: number;
  hpp: number;
  margin: number;
  margin_percent: number;
  markup_percent: number;
  total_transaction: number;
}
