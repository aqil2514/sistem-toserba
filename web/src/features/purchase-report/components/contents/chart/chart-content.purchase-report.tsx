import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { usePurchaseReport } from "@/features/purchase-report/store/provider.purchase-report";
import {
  PurchaseReportBreakdownLineChart,
} from "./breakdown-line-chart.purchase-report";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartDataType } from "@/features/purchase-report/types/query.purchase-report";
import { PurchaseReportCategoryPieChart } from "./category-pie-chart.purchase-report";

export function PurchaseReportChartContent() {
  const { data, isLoading } = usePurchaseReport();

  if (isLoading || !data) return <LoadingSpinner label="Mengambil data...." />;

  if (data.mode === "chart") {
    if (data.chart_data === "breakdown")
      return <PurchaseReportBreakdownLineChart data={data.data} />;
    if (data.chart_data === "category")
      return <PurchaseReportCategoryPieChart data={data.data} />;
  }

  return null;
}

export const ChartDataSelect = () => {
  const { query, updateQuery } = usePurchaseReport();
  return (
    <div>
      <Select
        value={query.chart_data}
        onValueChange={(e: ChartDataType) => updateQuery("chart_data", e)}
      >
        <SelectTrigger className="w-45">
          <SelectValue placeholder="Chart Data" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="breakdown">Per Hari</SelectItem>
          <SelectItem value="category">Per Kategori</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};