export interface SalesReportProductSummaryColumn {
  product_id: string;
  product_name: string;
  quantity: number;
  total_hpp: number;
  total_tip: number;
  total_discount: number;
  total_margin: number;
  margin_percent: number;
  markup_percent: number;
  total_amount: number;
}

export interface ProductSummaryApiResponse {
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
