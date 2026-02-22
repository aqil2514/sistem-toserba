import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BasicQuery, DataQueryResponse } from '../../../@types/general';
import {
  endOfDayUTC,
  formatQueryDate,
  startOfDayUTC,
} from '../../../utils/format-date';
import {
  CashflowAllocationSummary,
  CashflowBreakdownRpc,
  DailyCashflowSummaryRow,
  MovementAssetSummary,
  MovementAssetViaSummary,
} from '../types/cashflow-report.types';
import {
  applyDateRangeFilter,
  buildPaginationMeta,
} from '../../../utils/query-builder';
import { CashflowReportDto } from '../dto/cashflow-report-query.dto';
import { BasicQueryService } from '../../../services/query/query.service';
import { BalanceSnapshotDb } from '../types/cashflow-balance-snapshot.types';

@Injectable()
export class CashflowReportService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,

    private readonly queryService: BasicQueryService,
  ) {}

  async getCashflowBreakdown(
    rawQuery: CashflowReportDto,
  ): Promise<DataQueryResponse<CashflowBreakdownRpc[]>> {
    const query = this.queryService.mapToBasicQuery(rawQuery);
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

  async getCashflowSummary(
    rawQuery: CashflowReportDto,
  ): Promise<DailyCashflowSummaryRow[]> {
    const query = this.queryService.mapToBasicQuery(rawQuery);

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

  // >>>>>> CASHFLOW MOVEMENT START <<<<<<

  private async getCurrentBalance(): Promise<MovementAssetSummary['data']> {
    const { data, error } = await this.supabase.rpc(
      'get_asset_running_global',
      {
        p_start_utc: startOfDayUTC(new Date()),
        p_end_utc: endOfDayUTC(new Date()),
      },
    );

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  private async getBalanceByRange(
    from: string,
    to: string,
  ): Promise<MovementAssetSummary['data']> {
    const { data, error } = await this.supabase.rpc('get_net_worth_history', {
      p_from: from,
      p_to: to,
    });

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  async getCashflowMovement(
    rawQuery: CashflowReportDto,
  ): Promise<MovementAssetSummary> {
    const query = this.queryService.mapToBasicQuery(rawQuery);
    const { endUtc, startUtc } = formatQueryDate(query);
    const today = new Date().toISOString().split('T')[0];
    const endQuery = endUtc.split('T')[0];

    const isIncludeToday = today === endQuery;

    const rangeBalance = await this.getBalanceByRange(startUtc, endUtc);
    if (!isIncludeToday) {
      return {
        type: 'movement-global',
        data: rangeBalance,
      };
    }

    const todayBalance = await this.getCurrentBalance();

    const data = [...todayBalance, ...rangeBalance];

    return {
      type: 'movement-global',
      data,
    };
  }

  async getCashflowMovementWithAsset(
    rawQuery: CashflowReportDto,
  ): Promise<MovementAssetViaSummary> {
    const query = this.queryService.mapToBasicQuery(rawQuery);

    const { endUtc, startUtc } = formatQueryDate(query);

    const { data, error } = await this.supabase.rpc(
      'get_asset_running_per_via',
      {
        p_start_utc: startUtc,
        p_end_utc: endUtc,
      },
    );

    if (error) {
      console.error(error);
      throw error;
    }

    return {
      data,
      type: 'movement-asset',
    };
  }

  // >>>>>> CASHFLOW MOVEMENT END <<<<<<

  async getCashflowAllocation(
    rawQuery: CashflowReportDto,
  ): Promise<CashflowAllocationSummary[]> {
    const query = this.queryService.mapToBasicQuery(rawQuery);

    const { endUtc, startUtc } = formatQueryDate(query);

    const { data, error } = await this.supabase.rpc(
      'get_cashflow_category_summary',
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
