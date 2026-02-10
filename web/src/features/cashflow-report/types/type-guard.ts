import { DataQueryResponse } from "@/@types/general";
import { CashflowBreakdownRpc, CashflowReportAPiReturn, DailyCashflowSummaryRow } from "./api-return.types";

export function isBreakdownCashflowReport(
  content: string,
  data: CashflowReportAPiReturn,
): data is DataQueryResponse<CashflowBreakdownRpc[]> {
  return content === "breakdown";
}

export function isSummaryCashflowReport(
  content: string,
  data: CashflowReportAPiReturn,
): data is DailyCashflowSummaryRow[] {
  return content === "summary";
}
