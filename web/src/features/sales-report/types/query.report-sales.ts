import { BasicQuery } from "@/@types/general";

export interface SalesReportDetailQuery extends BasicQuery {
  mode: "full" | "product";
}

export interface SalesReportChartQuery extends BasicQuery {
  mode: "breakdown" | "per-category";
  groupBy?: "day" | "week" | "month" | "year";
}
