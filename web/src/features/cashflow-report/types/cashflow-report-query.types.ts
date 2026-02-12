import { BasicQuery } from "@/@types/general";

export type CashflowReportContent = "breakdown" | "summary" | "movement";
export type CashflowReportMode = "movement-global" | "movement-asset" | null;

export interface CashflowReportQuery extends BasicQuery {
  content: CashflowReportContent;
  mode: CashflowReportMode;
}
