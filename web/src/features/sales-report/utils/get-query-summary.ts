import { formatDate } from "@/utils/format-date.fns";
import { SalesReportQuery } from "../types/query.report-sales";

export function getQuerySummary(raw: SalesReportQuery) {
  const periode = `${formatDate(
    raw?.from ?? new Date(),
    "29 Desember 2025"
  )} s/d ${formatDate(raw?.to ?? new Date(), "29 Desember 2025")}`;

  return {
    periode,
  };
}
