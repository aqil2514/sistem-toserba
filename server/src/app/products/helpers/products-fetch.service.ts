import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Product } from '../interface/products.interface';
import { ProductStockService } from './products-stock.service';

@Injectable()
export class ProductFetchService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,

    private readonly productStockService: ProductStockService,
  ) {}

  private async getProductsWithStock(
    applyDeletedFilter?: (query: any) => any,
  ): Promise<Product[]> {
    const stocks = await this.productStockService.getProductStock();

    const mappedStock = Object.fromEntries(
      stocks.data.map((p) => [p.product_id, p.remaining_quantity]),
    );

    let query = this.supabase.from('products').select('*').order('name');

    if (applyDeletedFilter) {
      query = applyDeletedFilter(query);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data.map((d) => ({
      ...d,
      stock: mappedStock[d.id] ?? 0,
    }));
  }

  async findAll(): Promise<Product[]> {
    return this.getProductsWithStock();
  }

  async findAllNonDeletedItem(): Promise<Product[]> {
    return this.getProductsWithStock((q) => q.is('deleted_at', null));
  }

  async findAllDeletedItem(): Promise<Product[]> {
    return this.getProductsWithStock((q) => q.not('deleted_at', 'is', null));
  }

  async findById(productId: string): Promise<Product[]> {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .is('deleted_at', null)
      .order('name')
      .eq('id', productId);

    if (error) throw error;
    return data;
  }
}
