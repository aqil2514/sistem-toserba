import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

    async findAll() {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .is('deleted_at', null)
      .order('name');

    if (error) throw error;
    return data;
  }
}
