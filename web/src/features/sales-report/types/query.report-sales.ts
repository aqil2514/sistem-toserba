import { BasicQuery } from "@/@types/general";

export type DataMode = "summary-product" | "full";
export type ReportContent = "summary" | "detail" | 'chart';

export interface SalesReportQuery extends BasicQuery {
  mode: DataMode;
  content: ReportContent;
}
