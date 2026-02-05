import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { AssetRpcReturn } from '../types/asset.types';
import { BasicQuery } from '../../../@types/general';
import { formatQueryDate } from '../../../utils/format-date';

@Injectable()
export class AssetFinancialFetchService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async getSummaryAsset(query: BasicQuery): Promise<AssetRpcReturn[]> {
    const { endUtc, startUtc } = formatQueryDate(query);
    const { data, error } = await this.supabase.rpc(
      'get_asset_financial_summary',
      {
        p_start_utc: startUtc,
        p_end_utc: endUtc,
      },
    );

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }
}
