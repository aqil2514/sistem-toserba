import { DataQueryResponse } from "@/@types/general";

// Discriminated union to represent different response shapes
// while keeping the API type-safe and easy to extend
export type PurchaseReportApiResponse =
  | PurchaseReportSummaryMode
  | PurchaseReportDetailMode;

export interface PurchaseReportSummaryMode {
  // Used by the frontend to explicitly identify summary responses
  mode: "summary";
  buy_average: number;
  total_price: number;
  total_transaction: number;
}

// Detailed row-level data is separated to keep the report scalable
// and avoid bloating the summary response
export interface PurchaseReportDetailData {
  purchase_date: string;
  purchase_code: string;
  supplier_name: string;
  supplier_type: string;
  product_name: string;
  product_category: string;
  product_subcategory: string;
  quantity: number;
  remaining_quantity: number;
  price: number;
  hpp: number;
}

// Extends a generic paginated response to ensure consistency
// across list-based API endpoints
export interface PurchaseReportDetailMode
  extends DataQueryResponse<PurchaseReportDetailData[]> {
  // Acts as a discriminator for frontend branching logic
  mode: "detail";
}
