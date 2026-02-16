import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { DataQueryResponse } from '../../../@types/general';
import { SalesDb } from '../interface/sales.interface';
import {
  buildPaginationMeta,
  executeSupabaseBasicQuery,
} from '../../../utils/query-builder';
import { SalesItemApiResponse } from '../interface/sales-items.interface';
import { BasicQueryDto } from '../../../services/query/dto/query.dto';
import { BasicQueryService } from '../../../services/query/query.service';

@Injectable()
export class SalesFetcherService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
    private readonly basicQueryService: BasicQueryService,
  ) {}

  async findByQuery(
    rawquery: BasicQueryDto,
  ): Promise<DataQueryResponse<SalesDb[]>> {
    const query = this.basicQueryService.mapToBasicQuery(rawquery);
    let supabase = this.supabase
      .from('sales')
      .select('*', { count: 'exact' })
      .is('deleted_at', null);

    const client = executeSupabaseBasicQuery(supabase, query, 'created_at');

    const { data, error, count } = await client;

    if (error) {
      console.error(error);
      throw new InternalServerErrorException('Terjadi error saat mencari data');
    }

    const meta = buildPaginationMeta(query.page, query.limit, count);

    return {
      data,
      meta,
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

  async getCustomerName() {
    const { data, error } = await this.supabase
      .from('customer_name')
      .select('*');

    if (error) {
      console.error(error);
      throw error;
    }

    const customer_name = data.map((cust) => cust.customer_name);

    return customer_name;
  }
}
