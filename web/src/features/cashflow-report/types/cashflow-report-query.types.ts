import { BasicQuery } from "@/@types/general";

export type CashflowReportContent = "breakdown" | "summary" | "movement" | 'allocation';
export type CashflowReportMovementMode = "movement-global" | "movement-asset";
export interface CashflowReportMovementQuery extends BasicQuery {
  mode: CashflowReportMovementMode;
}
