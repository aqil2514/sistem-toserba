import { DataQueryResponse } from "@/@types/general";

export type CashflowReportAPiReturn =
  | DataQueryResponse<CashflowBreakdownRpc[]>
  | DailyCashflowSummaryRow[]
  | MovementAssetSummary[]
  | MovementAssetViaSummary[];

export interface CashflowBreakdownRpc {
  price: number;
  status_cashflow: string;
  transaction_at: string;
  via: string;
}

export interface DailyCashflowSummaryRow {
  transaction_at: string;

  income: number;
  expense: number;
  payable: number;
  receivable: number;

  net_cash: number;
  total_activity: number;
  income_count: number;
  non_cash_activity: number;

  has_payable: boolean;
  has_receivable: boolean;

  total_income_period: number;
  total_expense_period: number;
  total_receivable_period: number;
  total_payable_period: number;
}

export interface MovementAssetSummary {
  date: string;
  running_total: number;
}

export interface MovementAssetViaSummary {
  date: string;
  via: string;
  running_total: number;
}
