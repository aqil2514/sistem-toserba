import { LineChartData } from "@/components/molecules/chart/line-chart";
import { PieChartData } from "@/components/molecules/chart/pie-chart";

export interface SalesReportBreakdownChartType {
  data: LineChartData[];
  mode: "breakdown";
}

export interface SalesReportPerCategoryCartType {
  data: PieChartData[];
  mode: "per-category";
}

export type SalesReportChartReturn =
  | SalesReportBreakdownChartType
  | SalesReportPerCategoryCartType;
