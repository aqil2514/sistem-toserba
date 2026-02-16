import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SalesQuery } from '../interface/sales-query.interface';
import { DataQueryResponse } from '../../../@types/general';
import { SalesDb } from '../interface/sales.interface';
import {
  applyDateRangeFilter,
  applyPagination,
} from '../../../utils/query-builder';
import { SalesItemApiResponse } from '../interface/sales-items.interface';

@Injectable()
export class SalesFetcherService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async findByQuery(query: SalesQuery): Promise<DataQueryResponse<SalesDb[]>> {
    const {
      page,
      limit,
      from,
      to,
      toggleColumnKey,
      toggleColumnValue,
      sortedKey,
      sortedValue,
    } = query;
    let client = this.supabase
      .from('sales')
      .select('*', { count: 'exact' })
      .is('deleted_at', null);

    if (page && limit) applyPagination(client, page, limit);

    if (from) applyDateRangeFilter(client, 'transaction_at', from, to);
    if (toggleColumnKey && toggleColumnValue)
      client.ilike(toggleColumnKey, `%${toggleColumnValue}%`);

    if (sortedKey && sortedValue)
      client.order(sortedKey, { ascending: sortedValue === 'asc' });

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

    if (!data || data.length === 0)
      throw new NotFoundException('Data tidak ditemukan');
    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  async getCustomerName(){
    const {data,error} = await this.supabase.from("customer_name").select("*");

    if(error){
        console.error(error);
        throw error
    }

    const customer_name = data.map(cust => cust.customer_name);

    return customer_name;
  }
}
