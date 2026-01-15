import { BasicQuery } from "@/@types/general";

export type DataMode = 'summary-product' | 'full';
export type ChartMode = 'breakdown-omzet' | 'report-per-category';
export type ReportMode = DataMode | ChartMode;
export type ReportContent = 'summary' | 'detail' | 'chart';

export interface SalesReportQuery extends BasicQuery {
  mode: ReportMode;
  content: ReportContent;
}
