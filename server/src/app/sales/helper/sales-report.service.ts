import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  SalesReportProductRpcParams,
  SalesReportProductRpcReturn,
  SalesReportQuery,
  SalesReportSummaryRpcParams,
  SalesReportSummaryRpcReturn,
} from '../interface/sales-report.interface';
import {
  applyDateRangeFilter,
  applyFilterState,
  applyPagination,
  applySortingState,
  buildPaginationMeta,
} from '../../../utils/query-builder';
import { DataQueryResponse } from '../../../@types/general';
import { SalesItemApiResponse } from '../interface/sales-items.interface';
import { DateTime } from 'luxon';

@Injectable()
export class SalesReportService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  private mapToReportSummaryByProduct(
    raw: SalesReportQuery,
  ): SalesReportProductRpcParams {
    const start = DateTime.fromJSDate(new Date(raw.from), {
      zone: 'Asia/Jakarta',
    }).startOf('day');

    const end = DateTime.fromJSDate(new Date(raw.to ?? raw.from), {
      zone: 'Asia/Jakarta',
    }).endOf('day');

    const startUtc = start.toUTC().toISO();
    const endUtc = end.toUTC().toISO();

    return {
      p_start_utc: startUtc,
      p_end_utc: endUtc,
      p_limit: raw.limit,
      p_page: raw.page,
      p_product_name: raw?.filters?.[0].value ?? undefined,
      p_sort_by: raw?.sort?.[0].key ?? undefined,
      p_sort_dir: raw?.sort?.[0].value ?? undefined,
    };
  }

  private mapToSalesReportSummary(
    raw: SalesReportQuery,
  ): SalesReportSummaryRpcParams {
    const start = DateTime.fromJSDate(new Date(raw.from), {
      zone: 'Asia/Jakarta',
    }).startOf('day');

    const end = DateTime.fromJSDate(new Date(raw.to ?? raw.from), {
      zone: 'Asia/Jakarta',
    }).endOf('day');

    const p_start_utc = start.toUTC().toISO();
    const p_end_utc = end.toUTC().toISO();

    const p_buyer = raw.filters?.find(
      (filter) => filter.key === 'p_buyer',
    )?.value;

    const p_payment_method = raw.filters?.find(
      (filter) => filter.key === 'p_payment_method',
    )?.value;

    const p_product_category = raw.filters?.find(
      (filter) => filter.key === 'p_product_category',
    )?.value;

    const p_product_name = raw.filters?.find(
      (filter) => filter.key === 'p_product_name',
    )?.value;

    const p_product_subcategory = raw.filters?.find(
      (filter) => filter.key === 'p_product_subcategory',
    )?.value;

    return {
      p_start_utc,
      p_end_utc,
      p_buyer,
      p_payment_method,
      p_product_category,
      p_product_name,
      p_product_subcategory,
    };
  }

  async getSalesReport(
    query: SalesReportQuery,
  ): Promise<DataQueryResponse<SalesItemApiResponse[]>> {
    const { limit, page, from, to, filters, sort } = query;

    let client = this.supabase
      .from('sales_items')
      .select('*, product_id!inner(*), sales_id!inner(*)', { count: 'exact' })
      .is('deleted_at', null);

    if (page && limit) applyPagination(client, page, limit);
    if (from) applyDateRangeFilter(client, 'transaction_date', from, to);
    if (filters) {
      for (const filter of filters) {
        applyFilterState(client, filter);
      }
    }
    if (sort) {
      for (const state of sort) {
        applySortingState(client, state);
      }
    }

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

  async getSalesReportProductSummary(
    query: SalesReportQuery,
  ): Promise<DataQueryResponse<SalesReportProductRpcReturn[]>> {
    const rpcQuery = this.mapToReportSummaryByProduct(query);

    const { data, error } = await this.supabase.rpc(
      'get_sales_report_by_products_summary',
      rpcQuery,
      {
        count: 'exact',
      },
    );

    if (error) {
      console.error(error);
      throw error;
    }

    const meta = buildPaginationMeta(
      rpcQuery.p_page,
      rpcQuery.p_limit,
      data?.[0]?.total_count ?? 0,
    );

    return { meta, data };
  }

  async getSalesSummaryContent(
    query: SalesReportQuery,
  ): Promise<SalesReportSummaryRpcReturn> {
    const rpcQuery = this.mapToSalesReportSummary(query);
    const { data, error } = await this.supabase
      .rpc('get_sales_report_summary', rpcQuery)
      .maybeSingle();

    if (error) {
      console.error(error);
      throw error;
    }

    if (!data)
      return {
        hpp: 0,
        margin: 0,
        margin_percent: 0,
        markup_percent: 0,
        omzet: 0,
        total_transaction: 0,
      };

    return data as SalesReportSummaryRpcReturn;
  }
}
