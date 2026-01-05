export interface GetSummaryQuery {
  startDate: Date;
  endDate?: Date;
  timezone: string;
}

export interface GetSummaryResponse {
  margin: number;
  margin_percent: number;
  markdown_percent: number;
  total_amount: number;
  total_hpp: number;
  total_transaction: number;
}
