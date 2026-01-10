import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SalesReportQuery } from '../interface/sales-report.interface';
import {
  applyDateRangeFilter,
  applyPagination,
  buildPaginationMeta,
} from 'src/utils/query-builder';
import { DataQueryResponse } from 'src/@types/general';
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
    const { limit, page, from, to } = query;
    let client = this.supabase
      .from('sales_items')
      .select('*, product_id(*), sales_id(*)', { count: 'exact' })
      .is('deleted_at', null);

    if (page && limit) applyPagination(client, page, limit);
    if (from) applyDateRangeFilter(client, 'transaction_date', from, to);

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
