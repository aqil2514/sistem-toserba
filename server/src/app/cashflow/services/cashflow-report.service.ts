import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BasicQuery, DataQueryResponse } from '../../../@types/general';
import { formatQueryDate } from '../../../utils/format-date';
import { CashflowBreakdownRpc, DailyCashflowSummaryRow } from '../types/cashflow-report.types';
import { buildPaginationMeta } from '../../../utils/query-builder';

@Injectable()
export class CashflowReportService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async getCashflowBreakdown(
    query: BasicQuery,
  ): Promise<DataQueryResponse<CashflowBreakdownRpc[]>> {
    const { page, limit, filters, sort } = query;
    const { endUtc, startUtc } = formatQueryDate(query);
    const { data, error } = await this.supabase.rpc('get_breakdown_cashflow', {
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

    const meta = buildPaginationMeta(page, limit, data[0]?.total_count ?? 0);

    if (!data || data.length === 0)
      return {
        data: [],
        meta,
      };

    return {
      data,
      meta,
    };
  }

  async getCashflowSummary(query: BasicQuery):Promise<DailyCashflowSummaryRow[]> {
    const { endUtc, startUtc } = formatQueryDate(query);

    const { data, error } = await this.supabase.rpc(
      'get_daily_cashflow_summary',
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
