export type PurchaseReportApiResponse = PurchaseReportSummaryMode | PurchaseReportDetailMode;

export interface PurchaseReportSummaryMode {
  mode: "summary";
  buy_average: number;
  total_price: number;
  total_transaction: number;
}

export interface PurchaseReportDetailMode {
  mode: "detail";
}
