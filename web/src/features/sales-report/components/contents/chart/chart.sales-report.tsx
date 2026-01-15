import { LineChartData } from "@/components/molecules/chart/line-chart";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useSalesReport } from "@/features/sales-report/store/provider.sales-report";
import { ChartContent } from "@/features/sales-report/types/api.report-sales";
import { isChartContent } from "@/features/sales-report/utils/type-guard";
import { formatDate } from "@/utils/format-date.fns";
import { SalesReportOmzetChart } from "./omzet-chart.sales-report";

const mapToLineData = (raw: ChartContent): LineChartData[] => {
  const result: LineChartData[] = raw.map((r) => ({
    label: formatDate(r.date, "29 Des 2025"),
    value: r.omzet,
  }));
  return result;
};

export function SalesReportChart() {
  const { data, isLoading, query } = useSalesReport();

  if (isLoading || !data) return <LoadingSpinner label="Memuat Data..." />;

  if (isChartContent(data, query.content)) {
    const mappedData = mapToLineData(data);
    return <SalesReportOmzetChart data={mappedData} />;
  }

  return null;
}
