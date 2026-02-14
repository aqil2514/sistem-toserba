import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  CashCountDetails,
  CashCounterDetail,
  CashCounterHeader,
  CashCounterThirdParty,
  CashCountingApiReturn,
  CashCounts,
  CashCountSchemaType,
  ThirdPartyCash,
} from '../types/cash-counting.types';
import { BasicQuery } from '../../../@types/general';
import { formatQueryDate } from '../../../utils/format-date';
import { CashCountPivotReturn } from '../types/cash-counting-report.types';

@Injectable()
export class CashCounterCashCountingFetchService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  private async getCashCountsById(id: string): Promise<CashCounts> {
    const { data, error } = await this.supabase
      .from('cash_counts')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error(error);
      throw error;
    }

    if (!data) throw new NotFoundException('Data tidak ditemukan');

    return data;
  }

  private async getThirdPartyByCashCountId(
    cash_count_id: string,
  ): Promise<ThirdPartyCash[]> {
    const { error, data } = await this.supabase
      .from('third_party_cash')
      .select('*')
      .eq('cash_count_id', cash_count_id);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  private async getCashCountDetailsByCashCountId(
    cash_count_id: string,
  ): Promise<CashCountDetails[]> {
    const { error, data } = await this.supabase
      .from('cash_count_details')
      .select('*, denomination:denomination_id(label)')
      .eq('cash_count_id', cash_count_id);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  async getDataByCashCountsId(id: string): Promise<CashCountingApiReturn> {
    const [cashCounts, thirdPartyCash, cashCountsDetails] = await Promise.all([
      this.getCashCountsById(id),
      this.getThirdPartyByCashCountId(id),
      this.getCashCountDetailsByCashCountId(id),
    ]);

    const header: CashCounterHeader = {
      date: cashCounts.date,
      difference: cashCounts.difference,
      net_store_cash: cashCounts.net_store_cash,
      system_cash: cashCounts.system_cash,
      third_party_cash: cashCounts.third_party_cash,
      total_physical_cash: cashCounts.total_physical_cash,
      note: cashCounts.note,
    };

    const details: CashCounterDetail[] = cashCountsDetails.map((data) => ({
      label: data.denomination.label,
      quantity: data.quantity,
      subtotal: data.subtotal,
    }));

    const thirdParty: CashCounterThirdParty[] = thirdPartyCash.map((data) => ({
      amount: data.amount,
      source: data.source,
      note: data.note,
    }));

    return {
      header,
      details,
      thirdParty,
    };
  }

  async getDataCashCountForm(id: string): Promise<CashCountSchemaType> {
    const [cashCounts, thirdPartyCash, cashCountsDetails] = await Promise.all([
      this.getCashCountsById(id),
      this.getThirdPartyByCashCountId(id),
      this.getCashCountDetailsByCashCountId(id),
    ]);

    const date = new Date(cashCounts.date).toISOString();
    const notes = cashCounts?.note ?? '';
    const isHaveThirdParty = thirdPartyCash.length > 0;
    const thirdParty: CashCountSchemaType['thirdParty'] = isHaveThirdParty
      ? thirdPartyCash.map((val) => ({
          amount: val.amount,
          source: val.source,
          note: val.note,
        }))
      : undefined;
    const detail: CashCountSchemaType['detail'] = cashCountsDetails.map(
      (val) => ({
        denominationId: val.denomination_id,
        quantity: val.quantity,
      }),
    );

    return {
      date,
      isHaveThirdParty,
      detail,
      notes,
      thirdParty,
    };
  }

  async getCashcountPivot(query: BasicQuery):Promise<CashCountPivotReturn> {
    const { endUtc, startUtc } = formatQueryDate(query);

    const { data, error } = await this.supabase.rpc('get_cash_count_pivot', {
      p_start_date: startUtc,
      p_end_date: endUtc,
    });

    if(error){
      console.error(error);
      throw error;
    }

    return data;
  }
}
