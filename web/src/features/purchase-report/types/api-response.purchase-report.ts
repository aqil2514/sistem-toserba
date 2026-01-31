import { DataQueryResponse } from "@/@types/general";

export type PurchaseReportApiResponse =
  | PurchaseReportSummaryMode
  | PurchaseReportDetailMode
  | PurchaseReportChartMode;

export interface PurchaseReportSummaryMode {
  mode: "summary";
  buy_average: number;
  total_price: number;
  total_transaction: number;
}

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

export interface PurchaseReportDetailMode extends DataQueryResponse<
  PurchaseReportDetailData[]
> {
  mode: "detail";
}

export type PurchaseReportChartMode = PurchaseReportChartBreakdownMode | PurchaseReportChartCategoryMode ;
export interface PurchaseReportChartBreakdownMode {
  data: {
    date: string;
    price: number;
  }[];
  mode: "chart";
  chart_data: "breakdown";
}

export interface PurchaseReportChartCategoryMode {
  data: {
    category: string;
    price: number;
  }[];
  mode: 'chart';
  chart_data: 'category'
}