import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

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
    const { error } = await this.supabase
      .from('products')
      .update({
        deleted_at: new Date().toISOString(),
      })
      .eq('id', id)
      .is('deleted_at', null);

    if (error) {
      console.error(error)
      throw error;
    }
  }

  async restore(id: string) {
    const { error } = await this.supabase
      .from('products')
      .update({ deleted_at: null })
      .eq('id', id);

    if (error) {
      console.error(error);
      throw error;
    }
  }
}
