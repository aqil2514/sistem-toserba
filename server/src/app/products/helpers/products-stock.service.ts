import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { ProductStockRpcResponse } from '../interface/products-stock.interface';

@Injectable()
export class ProductStockService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async getProductStock(): Promise<ProductStockRpcResponse> {
    const { data, error, count } = await this.supabase.rpc(
      'get_total_remaining_products',
      undefined,
      {
        count: 'exact',
      },
    );

    if (error) {
      console.error(error);
      throw error;
    }

    return {
      data,
      count,
    };
  }

  async getInProductHistory(id: string) {
    const { data, error } = await this.supabase
      .from('purchase_items')
      .select(
        'id, price, quantity, remaining_quantity, hpp, purchase:purchase_id(id, purchase_date, purchase_code, supplier_name)',
      )
      .eq('product_id', id)
      .is('deleted_at', null);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  async getOutProductHistory(id: string) {
    const { data, error } = await this.supabase
      .from('sales_items')
      .select(
        'discount, hpp, margin, quantity, subtotal, tip, sales:sales_id(sales_code,customer_name,transaction_at)',
      )
      .eq('product_id', id)
      .is('deleted_at', null);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }
}
