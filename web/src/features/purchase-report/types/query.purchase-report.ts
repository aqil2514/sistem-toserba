import { BasicQuery } from "@/@types/general";

export type PurchaseReportContent = "summary" | "detail" | "chart";
export type ChartDataType = "breakdown" | "category";

export interface PurchaseReportQuery extends BasicQuery {
  content: PurchaseReportContent;
  chart_data: ChartDataType;
}
