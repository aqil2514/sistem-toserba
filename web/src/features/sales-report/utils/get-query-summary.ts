import { formatDate } from "@/utils/format-date.fns";
import { SalesReportQuery } from "../types/query.report-sales";
import { modeMapper } from "../components/header/mode-select.sales-report";

export function getQuerySummary(raw: SalesReportQuery) {
  const periode = `${formatDate(
    raw?.from ?? new Date(),
    "29 Desember 2025"
  )} s/d ${formatDate(raw?.to ?? new Date(), "29 Desember 2025")}`;

  const modeMap = new Map<string, string>(
    modeMapper.map((mode) => [mode.value, mode.label])
  );

  const totalFilter = raw.filters?.length;

  return {
    periode,
    mode: modeMap.get(raw.mode),
    totalFilter,
  };
}
