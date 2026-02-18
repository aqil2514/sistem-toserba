import {
  Inject,
  Injectable,
  InternalServerErrorException,
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
  buildPaginationMeta,
  executeSupabaseBasicQuery,
} from '../../../utils/query-builder';
import {
  DataQueryResponse,
  DataQueryResponseWithMode,
} from '../../../@types/general';
import { SalesItemApiResponse } from '../interface/sales-items.interface';
import { formatQueryDate } from '../../../utils/format-date';
import { BasicQueryDto } from '../../../services/query/dto/query.dto';
import { BasicQueryService } from '../../../services/query/query.service';
import { SalesReportDetailDto } from '../dto/sales-report-detail.dto';
import { SalesReportChartDto } from '../dto/sales-report-chart.dto';

@Injectable()
export class SalesReportService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,

    private readonly queryService: BasicQueryService,
  ) {}

  // >>>>>> NEW START <<<<<<
  async getSalesReportSummary(
    rawQuery: BasicQueryDto,
  ): Promise<SalesReportSummaryRpcReturn> {
    const query = this.queryService.mapToBasicQuery(rawQuery);
    const { endUtc, startUtc } = formatQueryDate(query);

    const { data, error } = await this.supabase.rpc(
      'get_sales_report_summary',
      {
        p_start_utc: startUtc,
        p_end_utc: endUtc,
        p_filters: query.filters,
      },
    );

    if (error) {
      console.error(error);
      throw error;
    }
    return data[0];
  }

  // ====== DATA DETAIL START ======

  async getSalesReportDetailFullMode(
    rawQuery: SalesReportDetailDto,
  ): Promise<DataQueryResponseWithMode<SalesItemApiResponse[], 'full'>> {
    const query = this.queryService.mapToBasicQuery(rawQuery);
    const { limit, page } = query;

    let supabase = this.supabase
      .from('sales_items')
      .select('*, product_id!inner(*), sales_id!inner(*)', { count: 'exact' })
      .is('deleted_at', null);

    const client = executeSupabaseBasicQuery(
      supabase,
      query,
      'transaction_date',
    );

    const { data, error, count } = await client;

    if (error) {
      console.error(error);
      throw new InternalServerErrorException('Terjadi error saat mencari data');
    }

    const meta = buildPaginationMeta(page, limit, count ?? 0);

    return {
      data,
      meta,
      mode: 'full',
    };
  }

  async getSalesReportDetailProductMode(
    rawQuery: BasicQueryDto,
  ): Promise<
    DataQueryResponseWithMode<SalesReportProductRpcReturn[], 'product'>
  > {
    const query = this.queryService.mapToBasicQuery(rawQuery);
    const { endUtc, startUtc } = formatQueryDate(query);

    const { data, error } = await this.supabase.rpc(
      'get_sales_report_by_products_summary',
      {
        p_limit: query.limit,
        p_page: query.page,
        p_start_utc: startUtc,
        p_end_utc: endUtc,
        p_filters: query.filters,
        p_sortings: query.sort,
      },
    );

    if (error) {
      console.error(error);
      throw error;
    }

    const meta = buildPaginationMeta(
      query.page,
      query.limit,
      data?.[0]?.total_count ?? 0,
    );

    return {
      data,
      meta,
      mode: 'product',
    };
  }

  // ====== DATA DETAIL END ======

  // ====== CHART START ======
  async getSalesReportChartBreakdown(rawQuery: SalesReportChartDto) {
    const query = this.queryService.mapToBasicQuery(rawQuery);
    const { endUtc, startUtc } = formatQueryDate(query);
    const { data, error } = await this.supabase.rpc('get_breakdown_sales', {
      p_start_utc: startUtc,
      p_end_utc: endUtc,
      p_mode: rawQuery.groupBy ?? 'day',
    });

    if (error) {
      console.error(error);
      throw error;
    }

    return {
      data,
      mode: 'breakdown',
    };
  }

  async getSalesReportChartPerProduct(rawQuery: SalesReportChartDto) {
    const query = this.queryService.mapToBasicQuery(rawQuery);
    const { endUtc, startUtc } = formatQueryDate(query);
    const { data, error } = await this.supabase.rpc('get_per_product_sales', {
      p_start_utc: startUtc,
      p_end_utc: endUtc,
      p_limit: rawQuery.top ?? 10,
    });

    if (error) {
      console.error(error);
      throw error;
    }

    return {
      data,
      mode: 'per-product',
    };
  }

  // ====== CHART END ======

  // >>>>>> NEW END <<<<<<

  private mapToReportSummaryByProduct(
    raw: SalesReportQuery,
  ): SalesReportProductRpcParams {
    const { endUtc, startUtc } = formatQueryDate(raw);

    const p_product_name =
      raw?.filters?.find((fil) => fil.key === 'p_product_name')?.value ?? '';
    const p_product_category =
      raw?.filters?.find((fil) => fil.key === 'p_product_category')?.value ??
      '';
    const p_product_subcategory =
      raw?.filters?.find((fil) => fil.key === 'p_product_subcategory')?.value ??
      '';

    return {
      p_start_utc: startUtc,
      p_end_utc: endUtc,
      p_limit: raw.limit,
      p_page: raw.page,
      p_product_name,
      p_product_category,
      p_product_subcategory,
      p_sort_by: raw?.sort?.[0].key ?? undefined,
      p_sort_dir: raw?.sort?.[0].value ?? undefined,
    };
  }

  // Ini jangan dihapus dlu. Masih dipakek di export telegram
  private mapToSalesReportSummary(
    raw: SalesReportQuery,
  ): SalesReportSummaryRpcParams {
    const { endUtc, startUtc } = formatQueryDate(raw);

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
      p_start_utc: startUtc,
      p_end_utc: endUtc,
      p_buyer,
      p_payment_method,
      p_product_category,
      p_product_name,
      p_product_subcategory,
    };
  }

  async getSalesReportPerCategory(
    query: SalesReportQuery,
  ): Promise<{ category: string; omzet: number }[]> {
    const { endUtc: p_end_utc, startUtc: p_start_utc } = formatQueryDate(query);
    const { data, error } = await this.supabase.rpc(
      'get_sales_report_per_category',
      {
        p_end_utc,
        p_start_utc,
      },
    );

    if (error) {
      console.error(error);
      throw error;
    }

    if (!data) return [];

    return data;
  }

  // TODO Ini udah selesai, nanti tinggal diaudit lagi
  async getSalesReport(
    query: SalesReportQuery,
  ): Promise<DataQueryResponse<SalesItemApiResponse[]>> {
    const { limit, page } = query;

    let supabase = this.supabase
      .from('sales_items')
      .select('*, product_id!inner(*), sales_id!inner(*)', { count: 'exact' })
      .is('deleted_at', null);

    const client = executeSupabaseBasicQuery(
      supabase,
      query,
      'transaction_date',
    );

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

  // TODO Ini udah selesai, nanti tinggal diaudit lagi
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

  // Ini jangan dihapus dlu. Masih dipakek di export telegram
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
        omzet: 0,
        hpp: 0,
        margin: 0,
        margin_percent: 0,
        markup_percent: 0,
        total_transaction: 0,
      };

    return data as SalesReportSummaryRpcReturn;
  }
}
