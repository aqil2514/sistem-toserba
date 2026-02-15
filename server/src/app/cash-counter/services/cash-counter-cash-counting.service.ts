import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BasicQuery } from '../../../@types/general';
import {
  buildPaginationMeta,
  executeSupabaseBasicQuery,
} from '../../../utils/query-builder';
import {
  CashCountDetailsInsert,
  CashCountsInsert,
  CashCountsReturnApi,
  ThirdPartyCashInsert,
} from '../types/cash-counting.types';
import { CreateCashCountDto } from '../dto/cash-counting.dto';
import { formatQueryDate } from '../../../utils/format-date';
import { AssetRpcReturn } from '../../../app/asset-financial/types/asset.types';
import { CashDenomination } from '../types/denomination.types';
import { BasicQueryDto } from '../../../services/query/dto/query.dto';
import { BasicQueryService } from '../../../services/query/query.service';

@Injectable()
export class CashCounterCashCountingService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
    private readonly basicQueryService: BasicQueryService,
  ) {}

  private readonly query: BasicQuery = {
    limit: 10,
    page: 1,
    filters: [],
    sort: [],
    from: new Date(1970, 0, 1).toISOString(),
    to: new Date().toISOString(),
  };

  private async getAllDenomination(): Promise<CashDenomination[]> {
    const { data, error } = await this.supabase
      .from('denominations')
      .select('*')
      .order('nominal')
      .is('deleted_at', null);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  private async createDenominationMap() {
    const denominationData = await this.getAllDenomination();
    const map = new Map<string, CashDenomination>();

    denominationData.forEach((data) => {
      map.set(data.id, data);
    });

    return map;
  }

  private async getSummaryAsset(query: BasicQuery): Promise<AssetRpcReturn[]> {
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

  private async mapToCashCountsDb(
    raw: CreateCashCountDto,
    denominationMap: Map<string, CashDenomination>,
  ): Promise<CashCountsInsert> {
    const summaryAsset = await this.getSummaryAsset(this.query);

    const detail = raw.detail ?? [];
    const thirdParty = raw.thirdParty ?? [];

    const system_cash =
      summaryAsset.find((d) => d.asset === 'Tunai')?.total ?? 0;
    const third_party_cash =
      thirdParty?.reduce((acc, curr) => acc + curr.amount, 0) ?? 0;

    const total_physical_cash =
      detail?.reduce((acc, curr) => {
        const denomination = denominationMap.get(curr.denominationId);
        if (!denomination) return acc;

        return acc + denomination.nominal * curr.quantity;
      }, 0) ?? 0;

    const net_store_cash = total_physical_cash - third_party_cash;

    const difference = net_store_cash - system_cash;

    return {
      date: raw.date,
      note: raw.notes,
      difference,
      net_store_cash,
      system_cash,
      third_party_cash,
      total_physical_cash,
    };
  }

  private mapToThirdPartyCash(
    raw: CreateCashCountDto,
    cash_count_id: string,
  ): ThirdPartyCashInsert[] {
    const result: ThirdPartyCashInsert[] = [];
    const thirdParty = raw.thirdParty ?? [];
    if (thirdParty.length === 0) return result;

    thirdParty.forEach((third) => {
      const newThirdParty: ThirdPartyCashInsert = {
        amount: third.amount,
        source: third.source,
        note: third.note,
        cash_count_id,
      };

      result.push(newThirdParty);
    });

    return result;
  }

  private async mapToCashCountDetail(
    raw: CreateCashCountDto,
    cash_count_id: string,
    denominationMap: Map<string, CashDenomination>,
  ): Promise<CashCountDetailsInsert[]> {
    const result: CashCountDetailsInsert[] = [];
    const denominationDetail = raw.detail;

    if (denominationDetail.length === 0) return result;

    denominationDetail.forEach((detail) => {
      const denomination = denominationMap.get(detail.denominationId);
      if (!denomination) return null;

      const subtotal = denomination.nominal * detail.quantity;

      const newDetail: CashCountDetailsInsert = {
        cash_count_id,
        denomination_id: detail.denominationId,
        quantity: detail.quantity,
        subtotal,
      };

      result.push(newDetail);
    });

    return result;
  }

  private async createNewThirdPartyCash(
    payload: ThirdPartyCashInsert | ThirdPartyCashInsert[],
  ) {
    const { error } = await this.supabase
      .from('third_party_cash')
      .insert(payload);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  private async createCashCountDetails(
    payload: CashCountDetailsInsert | CashCountDetailsInsert[],
  ) {
    const { error } = await this.supabase
      .from('cash_count_details')
      .insert(payload);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  private async createNewCashCounts(
    payload: CashCountsInsert,
  ): Promise<string> {
    const { data, error } = await this.supabase
      .from('cash_counts')
      .insert(payload)
      .select('id')
      .maybeSingle();

    if (error) {
      console.error(error);
      throw error;
    }

    if (!data) throw new NotFoundException('Data tidak ditemukan');

    return data.id;
  }

  private async deleteThirdPartyCashByCashCountId(cash_count_id: string) {
    const { error } = await this.supabase
      .from('third_party_cash')
      .delete()
      .eq('cash_count_id', cash_count_id);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  private async deleteCashCountDetailsByCashCountId(cash_count_id: string) {
    const { error } = await this.supabase
      .from('cash_count_details')
      .delete()
      .eq('cash_count_id', cash_count_id);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  private async deleteCashCountsById(id: string) {
    const { error } = await this.supabase
      .from('cash_counts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  async getCashCounts(queryDto: BasicQueryDto): Promise<CashCountsReturnApi> {
    const query = this.basicQueryService.mapToBasicQuery(queryDto);
    
    const { limit, page } = query;

    let supabase = this.supabase
      .from('cash_counts')
      .select('*', { count: 'exact' })
      .is('deleted_at', null);

    const client = executeSupabaseBasicQuery(supabase, query, 'date');

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

  async createNewCashCountData(payload: CreateCashCountDto) {
    const denominationMap = await this.createDenominationMap();
    const mappedCashCount = await this.mapToCashCountsDb(
      payload,
      denominationMap,
    );
    const cashCountId = await this.createNewCashCounts(mappedCashCount);

    const mappedThirdParty = this.mapToThirdPartyCash(payload, cashCountId);
    const mappedCashCountDetail = await this.mapToCashCountDetail(
      payload,
      cashCountId,
      denominationMap,
    );

    await Promise.all([
      this.createNewThirdPartyCash(mappedThirdParty),
      this.createCashCountDetails(mappedCashCountDetail),
    ]);
  }

  async reCreateCashCountData(
    payload: CreateCashCountDto,
    cash_count_id: string,
  ) {
    await this.deleteCashCountData(cash_count_id);

    await this.createNewCashCountData(payload);
  }

  async deleteCashCountData(cash_count_id: string) {
    await Promise.all([
      this.deleteThirdPartyCashByCashCountId(cash_count_id),
      this.deleteCashCountDetailsByCashCountId(cash_count_id),
    ]);

    await this.deleteCashCountsById(cash_count_id);
  }
}
