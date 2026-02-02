export interface CashflowDb {
  id: string;
  created_at: string;
  transaction_at: string;
  product_service: string;
  category: string;
  via: string;
  price: number;
  note: string;
}
