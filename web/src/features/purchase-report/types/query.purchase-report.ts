import { BasicQuery } from "@/@types/general";

export type PurchaseReportContent = "summary" | "data" | "chart";

export interface PurchaseReportQuery extends BasicQuery {
  content: PurchaseReportContent;
}
