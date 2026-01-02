export interface ProductOutHistory {
  discount: number;
  hpp: number;
  margin: number;
  quantity: number;
  subtotal: number;
  tip: number;
  sales: {
    sales_code: string;
    customer_name: string;
    transaction_at: string;
  };
}
