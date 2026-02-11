import { DataQueryResponse } from '../../../@types/general';

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

//  >>>>>> CASH COUNTS DATABASE <<<<<<

export interface CashCounts {
  id: string;
  date: string;
  total_physical_cash: number;
  system_cash: number;
  third_party_cash: number;
  net_store_cash: number;
  difference: number;
  note?: string;
  created_at: string;
  deleted_at: string;
}
export type CashCountsReturnApi = DataQueryResponse<CashCounts[]>;
export type CashCountsInsert = Omit<
  CashCounts,
  'id' | 'created_at' | 'deleted_at'
>;

//  >>>>>> THIRD PARTY CASH DATABASE <<<<<<

export interface ThirdPartyCash {
  id: string;
  cash_count_id: string;
  source: string;
  amount: number;
  note?: string;
  created_at: string;
}
export type ThirdPartyCashInsert = Omit<ThirdPartyCash, 'id' | 'created_at'>;

//  >>>>>> CASH COUNT DETAIL DATABASE <<<<<<

export interface CashCountDetails {
  id: string;
  cash_count_id: string;
  denomination_id: string;
  quantity: number;
  subtotal: number;
  created_at: string;
  denomination?: {
    label: string;
  };
}
export type CashCountDetailsInsert = Omit<
  CashCountDetails,
  'id' | 'created_at'
>;

export interface CashCountSchemaType {
  date: string;
  isHaveThirdParty: boolean;
  detail: {
    denominationId: string;
    quantity: number;
  }[];
  thirdParty?:
    | {
        source: string;
        amount: number;
        note?: string | undefined;
      }[]
    | undefined;
  notes?: string | undefined;
}
