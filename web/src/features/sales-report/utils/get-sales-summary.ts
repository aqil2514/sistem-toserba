import { SalesItemApiResponse } from "@/features/sales/types/sales-item-api";
import { SalesSummaryReport } from "../types/sales-summary.report-sales";
import { ProductSummaryApiResponse } from "../types/summary-columns.report-sales";
import { isFullReport, isSummaryProduct } from "./type-guard";
import { DataQueryResponse } from "@/@types/general";

export function getSalesSummary(
  data: DataQueryResponse<SalesItemApiResponse[] | ProductSummaryApiResponse[]>,
  mode: string
): SalesSummaryReport {
  if (isFullReport(mode, data)) return getSalesSummaryFullMode(data);
  else if (isSummaryProduct(mode, data)) return getSalesSummaryProductMode(data)

  throw new Error("Tipe data tidak didukung");
}

const getSalesSummaryFullMode = (
  raw: DataQueryResponse<SalesItemApiResponse[]>
): SalesSummaryReport => {
  const hpp = raw.data.reduce((acc, curr) => acc + curr.hpp, 0);
  const margin = raw.data.reduce((acc, curr) => acc + curr.margin, 0);
  const omzet = raw.data.reduce((acc, curr) => acc + curr.subtotal, 0);
  const total_transactions = raw.meta.total;
  const margin_percent = margin / omzet;
  const markup_percent = margin / hpp;
  return {
    hpp,
    margin,
    margin_percent,
    markup_percent,
    omzet,
    total_transactions,
  };
};

const getSalesSummaryProductMode = (
  raw: DataQueryResponse<ProductSummaryApiResponse[]>
): SalesSummaryReport => {
  const hpp = raw.data.reduce((acc, curr) => acc + curr.hpp, 0);
  const margin = raw.data.reduce((acc, curr) => acc + curr.margin, 0);
  const omzet = raw.data.reduce((acc, curr) => acc + curr.subtotal, 0);
  const total_transactions = raw.meta.total;
  const margin_percent = margin / omzet;
  const markup_percent = margin / hpp;

  return {
    hpp,
    margin,
    margin_percent,
    markup_percent,
    omzet,
    total_transactions,
  };
};
