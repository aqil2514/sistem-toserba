import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SalesReportQuery } from '../interface/sales-report.interface';
import {
  applyDateRangeFilter,
  applyFilterState,
  applyPagination,
  buildPaginationMeta,
} from '../../../utils/query-builder';
import { DataQueryResponse } from '../../../@types/general';
import { SalesItemApiResponse } from '../interface/sales-items.interface';

@Injectable()
export class SalesReportService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async getSalesReport(
    query: SalesReportQuery,
  ): Promise<DataQueryResponse<SalesItemApiResponse[]>> {
    const { limit, page, from, to, filters } = query;
    let client = this.supabase
      .from('sales_items')
      .select('*, product_id!inner(*), sales_id!inner(*)', { count: 'exact' })
      .is('deleted_at', null);

    if (page && limit) applyPagination(client, page, limit);
    if (from) applyDateRangeFilter(client, 'transaction_date', from, to);
    if (filters) {
      for (const filter of filters) {
        applyFilterState(client, filter);
      }
    }

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
