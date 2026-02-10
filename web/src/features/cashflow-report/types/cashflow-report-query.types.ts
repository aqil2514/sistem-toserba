import { BasicQuery } from "@/@types/general";

export type CashflowReportContent = "breakdown" | "summary";

export interface CashflowReportQuery extends BasicQuery {
  content: CashflowReportContent;
}
