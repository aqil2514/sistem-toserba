import { PieChartData } from "@/components/molecules/chart/pie-chart/pie-chart";
import { PurchaseReportChartCategoryMode } from "../types/api-response.purchase-report";

export function mapToPieChart(
  raw: PurchaseReportChartCategoryMode["data"],
): PieChartData[] {
  return raw.map((d) => ({ name: d.category, value: d.price }));
}
