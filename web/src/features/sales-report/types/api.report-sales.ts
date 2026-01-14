import { DataQueryResponse } from "@/@types/general";
import { SalesItemApiResponse } from "@/features/sales/types/sales-item-api";
import {
  ProductSummaryApiResponse,
  SalesReportSummaryRpcReturn,
} from "./api-return.report-sales";

export type ReportSalesApiReturn =
  | DetailContentFullMode
  | DetailContentProductSummaryMode
  | SummaryContent;

export type DetailContentFullMode = DataQueryResponse<SalesItemApiResponse[]>;
export type DetailContentProductSummaryMode =
  DataQueryResponse<ProductSummaryApiResponse[]>;
export type SummaryContent = SalesReportSummaryRpcReturn;
