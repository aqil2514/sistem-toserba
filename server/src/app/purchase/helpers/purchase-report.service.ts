import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { PurchaseQuery } from '../interface/purchase-query.interface';
import { formatQueryDate } from '../../../utils/format-date';
import {
  PurchaseReportChartBreakdownMode,
  PurchaseReportChartCategoryMode,
  PurchaseReportDetailMode,
  PurchaseReportSummaryMode,
} from '../interface/purchase-report-return.interface';
import { buildPaginationMeta } from '../../../utils/query-builder';

@Injectable()
export class PurchaseReportService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async getPurchaseDetailReport(
    query: PurchaseQuery,
  ): Promise<PurchaseReportDetailMode> {
    const { endUtc, startUtc } = formatQueryDate(query);
    const { limit, page, filters, sort } = query;

    const { data, error } = await this.supabase.rpc(
      'get_purchase_report_detail',
      {
        p_limit: limit,
        p_page: page,
        p_start_utc: startUtc,
        p_end_utc: endUtc,
        p_filters: filters,
        p_sortings: sort,
      },
    );

    if (error) {
      console.error(error);
      throw error;
    }

    const count = data?.[0]?.total_count ?? 0;

    const meta = buildPaginationMeta(query.page, query.limit, count);

    const response: PurchaseReportDetailMode = {
      data,
      meta,
      mode: 'detail',
    };

    return response;
  }

  async getPurchaseSummaryReport(
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

  async getPurchaseBreakdownReport(query: PurchaseQuery) {
    const { endUtc, startUtc } = formatQueryDate(query);

    const { data, error } = await this.supabase.rpc('get_breakdown_purchase', {
      p_start_utc: startUtc,
      p_end_utc: endUtc,
    });

    if (error) {
      console.error(error);
      throw error;
    }

    const response: PurchaseReportChartBreakdownMode = {
      data,
      chart_data: 'breakdown',
      mode: 'chart',
    };

    return response;
  }

  async getPurchaseCategoryReport(query: PurchaseQuery) {
    const { endUtc, startUtc } = formatQueryDate(query);

    const { data, error } = await this.supabase.rpc(
      'get_purchase_report_per_category',
      {
        p_start_utc: startUtc,
        p_end_utc: endUtc,
      },
    );

    if (error) {
      console.error(error);
      throw error;
    }

    const response: PurchaseReportChartCategoryMode = {
      data,
      chart_data: 'category',
      mode: 'chart',
    };

    return response;
  }
}
