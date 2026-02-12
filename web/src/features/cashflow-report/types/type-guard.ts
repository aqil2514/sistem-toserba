import { DataQueryResponse } from "@/@types/general";
import {
  CashflowBreakdownRpc,
  CashflowReportAPiReturn,
  DailyCashflowSummaryRow,
  MovementAssetSummary,
  MovementAssetViaSummary,
} from "./api-return.types";

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

export function isMovementAssetGlobalSummary(
  content: string,
  data: CashflowReportAPiReturn,
): data is MovementAssetSummary[] {
  return content === "movement";
}

export function isMovementAssetViaSummary(
  data: CashflowReportAPiReturn,
  content: string,
): data is MovementAssetViaSummary[] {
  return content === "movement";
}
