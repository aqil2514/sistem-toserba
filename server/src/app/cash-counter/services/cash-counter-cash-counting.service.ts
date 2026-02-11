import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BasicQuery } from '../../../@types/general';
import {
  buildPaginationMeta,
  executeSupabaseBasicQuery,
} from '../../../utils/query-builder';
import { CashCountsReturnApi } from '../types/cash-counting.types';

@Injectable()
export class CashCounterCashCountingService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async getCashCounts(query: BasicQuery):Promise<CashCountsReturnApi> {
    const { limit, page } = query;

    let supabase = this.supabase
      .from('cash_counts')
      .select('*', { count: 'exact' })
      .is('deleted_at', null);

    const client = executeSupabaseBasicQuery(
      supabase,
      query,
      'date',
    );

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
