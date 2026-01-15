import { LineChartData } from "@/components/molecules/chart/line-chart";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useSalesReport } from "@/features/sales-report/store/provider.sales-report";
import {
  ChartContent,
  PieChartContent,
} from "@/features/sales-report/types/api.report-sales";
import {
  isBreakdownOmzetChartContent,
  isPerCategoryChartContent,
} from "@/features/sales-report/utils/type-guard";
import { formatDate } from "@/utils/format-date.fns";
import { SalesReportOmzetChart } from "./omzet-chart.sales-report";
import { useEffect } from "react";
import { SalesReportPerCategoryChart } from "./per-category.sales-report";
import { PieChartData } from "@/components/molecules/chart/pie-chart";

const mapToLineData = (raw: ChartContent): LineChartData[] => {
  const result: LineChartData[] = raw.map((r) => ({
    label: formatDate(r.date, "29 Des 2025"),
    value: r.omzet,
  }));
  return result;
};

const mapToPieChart = (raw: PieChartContent): PieChartData[] => {
  const result: PieChartData[] = raw.map((r) => ({
    name: r.category,
    value: r.omzet,
  }));
  return result;
};

export function SalesReportChart() {
  const { data, isLoading, query, updateQuery } = useSalesReport();

  useEffect(() => {
    if (query.content === "chart")
      return updateQuery("mode", "breakdown-omzet");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.content]);

  if (isLoading || !data) return <LoadingSpinner label="Memuat Data..." />;

  if (
    query.mode === "breakdown-omzet" &&
    isBreakdownOmzetChartContent(data, query.content)
  ) {
    const mappedData = mapToLineData(data);
    return <SalesReportOmzetChart data={mappedData} />;
  }

  if (
    query.mode === "report-per-category" &&
    isPerCategoryChartContent(data, query.content)
  ) {
    const mappedData = mapToPieChart(data);
    return <SalesReportPerCategoryChart data={mappedData} />;
  }

  return null;
}
