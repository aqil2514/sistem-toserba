import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { PurchaseQuery } from '../interface/purchase-query.interface';
import { formatQueryDate } from '../../../utils/format-date';
import {
  PurchaseReportDetailMode,
  PurchaseReportSummaryMode,
} from '../interface/purchase-report-return.interface';
import { buildPaginationMeta } from 'src/utils/query-builder';

@Injectable()
export class PurchaseReportService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async getPurchaseByQuery(
    query: PurchaseQuery,
  ): Promise<PurchaseReportSummaryMode> {
    const { endUtc, startUtc } = formatQueryDate(query);

    const { error, data } = await this.supabase
      .rpc('get_purchase_product_summary', {
        p_start_utc: startUtc,
        p_end_utc: endUtc,
      })
      .maybeSingle<Partial<PurchaseReportSummaryMode>>();

    if (error) {
      console.error(error);
      throw error;
    }

    if (!data) {
      return {
        buy_average: 0,
        mode: 'summary',
        total_price: 0,
        total_transaction: 0,
      };
    }

    const result = {
      ...data,
      mode: 'summary',
    } as PurchaseReportSummaryMode;

    return result;
  }

  async getPurchaseDetailMode(
    query: PurchaseQuery,
  ): Promise<PurchaseReportDetailMode> {
    const { endUtc, startUtc } = formatQueryDate(query);

    const { data, error, count } = await this.supabase.rpc(
      'get_purchase_report_detail',
      {
        p_start_utc: startUtc,
        p_end_utc: endUtc,
      },
      { count: 'exact' },
    );

    if (error) {
      console.error(error);
      throw error;
    }

    const meta = buildPaginationMeta(query.page, query.limit, count);

    const response: PurchaseReportDetailMode = {
      data,
      meta,
      mode: 'detail',
    };

    return response;
  }
}
