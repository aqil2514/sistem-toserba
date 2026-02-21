import { ReceivablePayableStatus } from "./receivable-payable-types";

export interface PayableReceivableSummary {
  counterpart_name: string;
  total: number;
  paid: number;
  rest: number;
  status: ReceivablePayableStatus;
  type: 'receivable' | 'payable';
}

export interface PayableReceivableDetail {
  transaction_at: string;
  product_service: string;
  category: string;
  status_cashflow: string;
  via: string;
  price: number;

  category_id: string;
  transfer_group_id: string;
  id: string;
}

export interface PayableReceivable {
  summary: PayableReceivableSummary;
  detail: PayableReceivableDetail[];
}
