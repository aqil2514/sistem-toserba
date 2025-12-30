import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SalesQuery } from './interface/sales-query.interface';
import { SalesHeaderQueryResponse } from './interface/sales-header-response';
import { endOfDayUTC, startOfDayUTC } from 'src/utils/format-date';
import { applyDateRangeFilter, applyPagination } from 'src/utils/query-builder';
import { SalesItemApiResponse, SalesItemDb } from './interface/sales-items.interface';

@Injectable()
export class SalesService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async findByQuery(query: SalesQuery): Promise<SalesHeaderQueryResponse> {
    const { page, limit, from, to, toggleColumnKey, toggleColumnValue } = query;
    let client = this.supabase
      .from('sales')
      .select('*', { count: 'exact' })
      .order('transaction_at', { ascending: false });

    if (page && limit) applyPagination(client, page, limit);

    if (from) applyDateRangeFilter(client, 'transaction_at', from, to);
    if (toggleColumnKey && toggleColumnValue)
      client.ilike(toggleColumnKey, `%${toggleColumnValue}%`);

    const { data, error, count } = await client;

    if (error) {
      console.error(error);
      throw new InternalServerErrorException('Terjadi error saat mencari data');
    }

    return {
      data,
      meta: {
        page: Number(page),
        limit: Number(limit),
        total: Number(count ?? 0),
        totalPages: Math.ceil((count ?? 0) / limit),
      },
    };
  }

  async findItemBySalesId(sales_id: string): Promise<SalesItemApiResponse[]> {
    const { data, error } = await this.supabase
      .from('sales_items')
      .select('*, product_id(*), sales_id(*)')
      .eq('sales_id', sales_id);

    if (!data || data.length === 0) throw new NotFoundException('Data tidak ditemukan');
    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }
}
