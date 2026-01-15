import {
  ChartContent,
  DetailContentFullMode,
  DetailContentProductSummaryMode,
  PieChartContent,
  ReportSalesApiReturn,
  SummaryContent,
} from "../types/api.report-sales";
import { ReportContent } from "../types/query.report-sales";

export function isSummaryProduct(
  mode: string,
  data: ReportSalesApiReturn
): data is DetailContentProductSummaryMode {
  return mode === "summary-product";
}

export function isFullReport(
  mode: string,
  data: ReportSalesApiReturn
): data is DetailContentFullMode {
  return mode === "full";
}

export function isSummaryContent(
  data: ReportSalesApiReturn,
  content: ReportContent
): data is SummaryContent {
  return content === "summary";
}

export function isBreakdownOmzetChartContent(
  data: ReportSalesApiReturn,
  content: ReportContent
): data is ChartContent {
  return content === "chart";
}

export function isPerCategoryChartContent(
  data: ReportSalesApiReturn,
  content: ReportContent
): data is PieChartContent {
  return content === "chart";
}
