export interface CashflowRPCReturn {
  id: string;
  transaction_at: string;
  product_service: string;
  cashflow_category: string;
  status_cashflow: string;
  via: string;
  price: number;
  transfer_group_id?: string;
}
