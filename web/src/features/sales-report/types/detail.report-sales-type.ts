import { DataQueryResponseWithMode } from "@/@types/general";
import { SalesItemApiResponse } from "@/features/sales/types/sales-item-api";

export type SalesReportDetailReturn =
  | DataQueryResponseWithMode<SalesItemApiResponse[], "full">
  | DataQueryResponseWithMode<ProductSummaryApiResponse[], "product">;

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
