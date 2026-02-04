import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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

    console.log(data);

    const transferGroupId = data.transfer_group_id;

    if (transferGroupId) {
      console.log(transferGroupId);
      const { data: transferData, error: transferError } = await this.supabase
        .from('cashflow')
        .select('*, category!inner(*)')
        .eq('transfer_group_id', transferGroupId);
      console.log(transferData);

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
