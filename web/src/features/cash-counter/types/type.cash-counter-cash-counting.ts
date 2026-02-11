import { DataQueryResponse } from "@/@types/general";

//  >>>>>> API RETURN <<<<<<

export interface CashCounterHeader {
  date: string;
  total_physical_cash: number;
  system_cash: number;
  third_party_cash: number;
  net_store_cash: number;
  difference: number;
  note?: string;
}

export interface CashCounterThirdParty {
  source: string;
  amount: number;
  note?: string;
}

export interface CashCounterDetail {
  label: string;
  quantity: number;
  subtotal: number;
}

export interface CashCountingApiReturn {
  header: CashCounterHeader;
  thirdParty: CashCounterThirdParty[];
  details: CashCounterDetail[];
}

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
