import { BasicQuery } from "@/@types/general";

export type DataMode = "summary-product" | "full"

export interface SalesReportQuery extends BasicQuery {
  mode: DataMode;
}
