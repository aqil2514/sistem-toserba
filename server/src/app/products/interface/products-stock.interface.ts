export interface ProductStockRpcResponse {
  count: number;
  data: {
    product_id: string;
    remaining_quantity: number;
  }[];
}
