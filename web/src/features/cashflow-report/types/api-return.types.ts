import { DataQueryResponse } from "@/@types/general";

export type CashflowReportAPiReturn = DataQueryResponse<CashflowBreakdownRpc[]>;

export interface CashflowBreakdownRpc {
  price: number;
  status_cashflow: string;
  transaction_at: string;
  via: string;
}
