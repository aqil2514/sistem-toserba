import { InfoItem } from "@/components/molecules/items/info-item";
import { useSalesReportSummary } from "@/features/sales-report/store/sales-report-summary.provider";
import { formatDate } from "@/utils/format-date.fns";
import { summaryReportFilterConfig } from "../../../constants/summary-report-filter-config";

export function SalesReportSummaryHeader() {
  const { query } = useSalesReportSummary();

  const periode = `${formatDate(
    query?.from ?? new Date(),
    "29 Desember 2025",
  )} s/d ${formatDate(query?.to ?? new Date(), "29 Desember 2025")}`;

  const mapConfigLabel = new Map<string, string>(
    summaryReportFilterConfig.map((config) => [config.field, config.label]),
  );

  return (
    <div className="flex gap-8">
      <InfoItem label="Periode" value={periode} />

      {query.filters &&
        query.filters.map((filter, i) => (
          <InfoItem
            key={`filter-${i + 1}`}
            label={mapConfigLabel.get(filter.key) ?? ""}
            value={filter.value}
          />
        ))}
    </div>
  );
}
