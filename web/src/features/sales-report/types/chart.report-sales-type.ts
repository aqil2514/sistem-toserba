import { LineChartData } from "@/components/molecules/chart/line-chart/line-chart";
import { PieChartData } from "@/components/molecules/chart/pie-chart/pie-chart";

export interface SalesReportBreakdownChartType {
  data: LineChartData[];
  mode: "breakdown";
}

export interface SalesReportPerCategoryCartType {
  data: PieChartData[];
  mode: "per-category";
}

export interface SalesReportPerProductCartType {
  data: {
    product_id: string;
    label: string;
    total_quantity: number;
    total_revenue: number;
    total_margin: number;
  }[];
  mode:"per-product"
}

export type SalesReportChartReturn =
  | SalesReportBreakdownChartType
  | SalesReportPerCategoryCartType
  | SalesReportPerProductCartType;
