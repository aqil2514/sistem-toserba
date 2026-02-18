import { BasicQuery } from "@/@types/general";
import { SalesReportChartReturn } from "./chart.report-sales-type";

export interface SalesReportDetailQuery extends BasicQuery {
  mode: "full" | "product";
}

export interface SalesReportChartQuery extends BasicQuery {
  mode: SalesReportChartReturn["mode"];
  groupBy?: "day" | "week" | "month" | "year";
  top?: string;
}
