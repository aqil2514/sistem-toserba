import { LineChartData } from "@/components/molecules/chart/line-chart/line-chart";
import { PurchaseReportChartBreakdownMode } from "../types/api-response.purchase-report";

export function mapToLineChart(
  raw: PurchaseReportChartBreakdownMode["data"],
): LineChartData[] {
  const result: LineChartData[] = raw.map((data) => ({
    label: data.date,
    value: data.price,
  }));
  return result;
}
