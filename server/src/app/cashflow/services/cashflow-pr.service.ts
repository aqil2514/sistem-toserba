import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  PayableTypes,
  ReceivablePayableReturn,
  ReceivableTypes,
} from '../types/cashflow-pr.types';

@Injectable()
// PR = Payable Receivable
export class CashflowPRService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  private async getReceivableSummary(): Promise<ReceivableTypes[]> {
    const { data, error } = await this.supabase.rpc('get_receivable_summary');

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  private async getPayableSummary(): Promise<PayableTypes[]> {
    const { data, error } = await this.supabase.rpc('get_payable_summary');

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  async getPayableReceivable(): Promise<ReceivablePayableReturn> {
    const [receivable, payable] = await Promise.all([
      this.getReceivableSummary(),
      this.getPayableSummary(),
    ]);

    return {
      payable,
      receivable,
    };
  }
}
