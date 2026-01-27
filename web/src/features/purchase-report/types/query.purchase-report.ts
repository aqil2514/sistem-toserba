import { BasicQuery } from "@/@types/general";

export type PurchaseReportContent = "summary" | "detail" | "chart";

export interface PurchaseReportQuery extends BasicQuery {
  content: PurchaseReportContent;
}
