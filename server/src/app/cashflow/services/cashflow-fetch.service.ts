import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CashflowCategoryDb } from '../types/cashflow-category.types';
import { BasicQuery } from '../../../@types/general';
import {
  buildPaginationMeta,
  executeSupabaseBasicQuery,
} from '../../../utils/query-builder';

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

  async getCashflowsData(query: BasicQuery) {
    const { limit, page } = query;

    let supabase = this.supabase
      .from('cashflow')
      .select('*, category!inner(*)', { count: 'exact' })
      .is('deleted_at', null);

    const client = executeSupabaseBasicQuery(supabase, query, 'transaction_at');

    const { data, error, count } = await client;

    if (error) {
      console.error(error);
      throw new InternalServerErrorException('Terjadi error saat mencari data');
    }

    const meta = buildPaginationMeta(page, limit, count ?? 0);

    return {
      data,
      meta,
    };
  }
}
