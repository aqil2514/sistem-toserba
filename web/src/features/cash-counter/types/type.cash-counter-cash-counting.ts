import { DataQueryResponse } from "@/@types/general";

export interface CashCounts {
  id: string;
  date: string;
  total_physical_cash: number;
  system_cash: number;
  third_party_cash: number;
  net_store_cash: number;
  difference: number;
  note: string;
  created_at: string;
  deleted_at: string;
}

export type CashCountsSummary = Pick<
  CashCounts,
  | "total_physical_cash"
  | "system_cash"
  | "third_party_cash"
  | "net_store_cash"
  | "difference"
>;

export type CashCountsReturnApi = DataQueryResponse<CashCounts[]>;
