import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './interface/products.interface';
import { ProductStockRpcResponse } from './interface/products-stock.interface';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async findAll(): Promise<Product[]> {
    const stocks = await this.getProductStock();
    const mappedStock = Object.fromEntries(
      stocks.data.map((p) => [p.product_id, p.remaining_quantity]),
    );

    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .is('deleted_at', null)
      .order('name');

    if (error) throw error;

    const withStocks: Product[] = data.map((d) => {
      const stock = mappedStock[d.id] ?? 0;
      return {
        ...d,
        stock,
      };
    });
    return withStocks;
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

  async create(dto: CreateProductDto) {
    const { data, error } = await this.supabase
      .from('products')
      .insert({
        name: dto.name,
        price: dto.price,
        category: dto.category,
        subcategory: dto.subcategory ?? null,
        unit: dto.unit,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  async update(id: string, dto: UpdateProductDto) {
    const { data, error } = await this.supabase
      .from('products')
      .update({
        ...(dto.name !== undefined && { name: dto.name }),
        ...(dto.price !== undefined && { price: dto.price }),
        ...(dto.category !== undefined && { category: dto.category }),
        ...(dto.subcategory !== undefined && {
          subcategory: dto.subcategory,
        }),
        ...(dto.unit !== undefined && { unit: dto.unit }),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .is('deleted_at', null)
      .select()
      .single();

    if (error || !data) {
      throw error ?? new Error('Product not found');
    }

    return data;
  }

  async remove(id: string) {
    const { data, error } = await this.supabase
      .from('products')
      .update({
        deleted_at: new Date().toISOString(),
      })
      .eq('id', id)
      .is('deleted_at', null)
      .select()
      .single();

    if (error || !data) {
      throw error ?? new Error('Product not found');
    }

    return {
      message: 'Product deleted',
      data,
    };
  }

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
      .is("deleted_at", null);

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
      .is("deleted_at", null);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }
}
