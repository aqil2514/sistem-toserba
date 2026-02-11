import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  CashCountDetails,
  CashCounterDetail,
  CashCounterHeader,
  CashCounterThirdParty,
  CashCountingApiReturn,
  CashCounts,
  ThirdPartyCash,
} from '../types/cash-counting.types';

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
}
