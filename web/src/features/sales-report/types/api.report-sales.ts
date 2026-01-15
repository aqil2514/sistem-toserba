import { DataQueryResponse } from "@/@types/general";
import { SalesItemApiResponse } from "@/features/sales/types/sales-item-api";
import {
  ProductSummaryApiResponse,
  SalesReportSummaryRpcReturn,
} from "./api-return.report-sales";
import { SalesReportLineChartType } from "./chart.report-sales-type";

export type ReportSalesApiReturn =
  | DetailContentFullMode
  | DetailContentProductSummaryMode
  | SummaryContent
  | ChartContent;

// >>>>> DATA CONTENT <<<<<
export type DetailContentFullMode = DataQueryResponse<SalesItemApiResponse[]>;
export type DetailContentProductSummaryMode = DataQueryResponse<
  ProductSummaryApiResponse[]
>;

// >>>>> SUMMARY CONTENT <<<<<
export type SummaryContent = SalesReportSummaryRpcReturn;

// >>>>> CHART CONTENT <<<<<
export type ChartContent = SalesReportLineChartType;
