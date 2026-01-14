import { useFetch } from "@/hooks/use-fetch";
import { DataQueryResponse } from "@/@types/general";
import { SalesItemApiResponse } from "@/features/sales/types/sales-item-api";
import { ProductSummaryApiResponse } from "../types/api-return.report-sales";

export interface ReportResponseMap {
  full: SalesItemApiResponse[];
  "summary-product": ProductSummaryApiResponse[];
}

export type ReportMode = keyof ReportResponseMap;

export const useFetchDb = <M extends keyof ReportResponseMap>(
  //   Sengaja untuk Type Driver
  reportMode: M,
  url?: string
) => {
  return useFetch<DataQueryResponse<ReportResponseMap[M]>>(url ?? null);
};
