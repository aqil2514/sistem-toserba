import { InfoItem } from "@/components/molecules/items/info-item";
import { useSalesReport } from "@/features/sales-report/store/provider.sales-report";
import { getQuerySummary } from "@/features/sales-report/utils/get-query-summary";

export function SalesReportSummaryHeader() {
  const { query } = useSalesReport();

  const { periode, mode, totalFilter } = getQuerySummary(query);

  return (
    <div className="flex gap-8 justify-between">
      <InfoItem label="Periode" value={periode} />
      <InfoItem label="Mode Data" value={mode} />
      <InfoItem
        label="Total Filter"
        value={totalFilter ? `${totalFilter} Filter` : "Tidak Ada"}
      />
    </div>
  );
}
