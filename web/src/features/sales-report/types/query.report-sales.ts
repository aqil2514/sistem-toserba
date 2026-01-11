import { BasicQuery, FilterState } from "@/@types/general";

export interface SalesReportQuery extends BasicQuery {
  filters?: FilterState[];
}
