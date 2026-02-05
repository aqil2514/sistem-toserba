import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CashflowCategoryDb } from '../types/cashflow-category.types';
import { BasicQuery, DataQueryResponse } from '../../../@types/general';
import {
  buildPaginationMeta,
} from '../../../utils/query-builder';
import { formatQueryDate } from '../../../utils/format-date';
import { CashflowRPCReturn } from '../types/cashflow-rpc.types';

@Injectable()
export class CashflowFetchService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async getAllCashflowCategory(): Promise<CashflowCategoryDb[]> {
    const { data, error } = await this.supabase
      .from('cashflow_category')
      .select('*')
      .neq('id', 'd8d34dd6-4010-4e96-a081-288821917620')
      .order('name', { ascending: true });

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  async getAllCashflowAsset() {
    const { data, error } = await this.supabase
      .from('cashflow_unique_via')
      .select('*');

    if (error) {
      console.error(error);
      throw error;
    }

    const values = data.map((item) => item.via);

    return values;
  }

  async getCashflowsData(
    query: BasicQuery,
  ): Promise<DataQueryResponse<CashflowRPCReturn[]>> {
    const { limit, page, filters, sort } = query;
    const { endUtc, startUtc } = formatQueryDate(query);

    const { data, error } = await this.supabase.rpc('get_cashflow_data', {
      p_limit: limit,
      p_page: page,
      p_start_utc: startUtc,
      p_end_utc: endUtc,
      p_filters: filters,
      p_sortings: sort,
    });

    if (error) {
      console.error(error);
      throw error;
    }

    const count = data?.[0]?.total_count ?? 0;

    const meta = buildPaginationMeta(page, limit, count ?? 0);

    return {
      data,
      meta,
    };
  }

  async getCashflowDataById(cashflowId: string) {
    const { data, error } = await this.supabase
      .from('cashflow')
      .select('*, category!inner(*)')
      .eq('id', cashflowId)
      .single();

    if (error) {
      console.error(error);
      throw error;
    }

    const transferGroupId = data.transfer_group_id;

    if (transferGroupId) {
      const { data: transferData, error: transferError } = await this.supabase
        .from('cashflow')
        .select('*, category!inner(*)')
        .eq('transfer_group_id', transferGroupId);

      if (transferError) {
        console.error('Error Transfer', transferError);
        throw transferError;
      }

      if (!transferData || transferData.length === 0) {
        throw new NotFoundException('Data transfer tidak ditemukan');
      }

      return transferData;
    }

    return [data];
  }
}
