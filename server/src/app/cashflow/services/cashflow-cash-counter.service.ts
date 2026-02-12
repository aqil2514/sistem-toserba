import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CashflowDbInsert } from '../types/cashflow.types';
import { applyDateRangeFilter } from '../../../utils/query-builder';
import {
  endOfTodayUtcJakarta,
  startOfTodayUtcJakarta,
} from '../../../utils/format-date';
import { CashCounterCashCountingFetchService } from '../../cash-counter/services/cash-counter-cash-counting-fetch.service';

@Injectable()
export class CashflowCashCounterService {
  private readonly adjusment_category_id =
    '10dc9b82-78b3-47f8-b442-79c403983c80';
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
    private readonly fetchService: CashCounterCashCountingFetchService,
  ) {}

  private async saveToDb(raw: CashflowDbInsert | CashflowDbInsert[]) {
    const { error } = await this.supabase.from('cashflow').insert(raw);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  private async editDataDb(price: number, cashflowId: string) {
    const { error } = await this.supabase
      .from('cashflow')
      .update({ price, transaction_at: new Date().toISOString() })
      .eq('id', cashflowId);
    if (error) {
      console.error(error);
      throw error;
    }
  }

  private async existingCashPayment(): Promise<{
    id: string;
    price: number;
  } | null> {
    let client = this.supabase
      .from('cashflow')
      .select('id, price')
      .eq('via', 'Tunai')
      .eq('source', 'cash-counter');

    client = applyDateRangeFilter(
      client,
      'transaction_at',
      startOfTodayUtcJakarta(),
      endOfTodayUtcJakarta(),
    );

    const { data, error } = await client.maybeSingle();

    if (error) {
      console.error(error);
      throw error;
    }

    if (!data) return null;

    return data;
  }

  async createNewData(raw: any) {
    const existingCashPayment = await this.existingCashPayment();
    const { header } = await this.fetchService.getDataByCashCountsId(raw.id);
    const { difference } = header;

    const isSurplusNet = difference > 0;
    if (difference === 0) return;

    const payload: CashflowDbInsert = {
      category: this.adjusment_category_id,
      note: 'Dibuat otomatis melalui Cash Counter',
      price: Math.abs(difference),
      status_cashflow: isSurplusNet ? 'income' : 'expense',
      product_service: 'Penyesuaian',
      transaction_at: new Date().toISOString(),
      via: 'Tunai',
      source: 'cash-counter',
    };

    if (!existingCashPayment) {
      await this.saveToDb(payload);
    } else {
      await this.editDataDb(payload.price, existingCashPayment.id);
    }
  }
}
