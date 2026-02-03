import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CashflowCategoryDb } from '../types/cashflow-category.types';

@Injectable()
export class CashflowFetchService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async getAllCashflowCategory(): Promise<CashflowCategoryDb[]> {
    const { data, error } = await this.supabase
      .from('cashflow_category')
      .select('*');

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }
}
