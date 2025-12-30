import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SalesQuery } from './interface/sales-query.interface';
import { SalesHeaderQueryResponse } from './interface/sales-header-response';

@Injectable()
export class SalesService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async findByQuery(query: SalesQuery): Promise<SalesHeaderQueryResponse> {
    const { page, limit, from, to } = query;
    let client = this.supabase
      .from('sales')
      .select('*', { count: 'exact' })
      .order('transaction_at', { ascending: false });

    if (page && limit) {
      const pageNum = Number(page ?? 1);
      const limitNum = Number(limit ?? 20);

      const from = (pageNum - 1) * limitNum;
      const to = from + limitNum - 1;

      client = client.range(from, to);
    }

    if (from) client = client.gte('transaction_at', from);

    if (to) client = client.lte('transaction_at', to);

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
}
