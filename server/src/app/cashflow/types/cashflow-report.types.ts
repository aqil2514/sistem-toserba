import { BasicQuery } from '../../../@types/general';

type CashflowReportContent = 'breakdown';

export interface CashflowReportQuery extends BasicQuery {
  content: CashflowReportContent;
}

export interface CashflowBreakdownRpc {
  transaction_at: string;
  price: number;
  status_cashflow: string;
  via: string;
}
