import { DataQueryResponse } from "@/@types/general";
import { SalesItemApiResponse } from "@/features/sales/types/sales-item-api";
import { ProductSummaryApiResponse } from "../types/summary-columns.report-sales";

export function isSummaryProduct(
  mode: string,
  data: DataQueryResponse<SalesItemApiResponse[] | ProductSummaryApiResponse[]>
): data is DataQueryResponse<ProductSummaryApiResponse[]> {
  return mode === "summary-product";
}

export function isFullReport(
  mode: string,
  data: DataQueryResponse<SalesItemApiResponse[] | ProductSummaryApiResponse[]>
): data is DataQueryResponse<SalesItemApiResponse[]> {
  return mode === "full";
}
