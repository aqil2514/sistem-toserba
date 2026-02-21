import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  PayableReceivable,
  PayableReceivableDetail,
  PayableReceivableSummary,
  PayableTypes,
  ReceivablePayableReturn,
  ReceivableTypes,
} from '../types/cashflow-pr.types';
import {
  CashflowDbPopulated,
  PayableCashflowMeta,
  ReceivableCashflowMeta,
} from '../types/cashflow.types';

@Injectable()
// PR = Payable Receivable
export class CashflowPRService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  // >>>>>> PAYABLE SECTION START <<<<<<

  private async getPayableCashflowDetail(
    p_vendor_name?: string,
  ): Promise<CashflowDbPopulated<PayableCashflowMeta>[]> {
    if (!p_vendor_name)
      throw new BadRequestException('Nama vendor wajib diisi');

    const { data, error } = await this.supabase
      .from('cashflow')
      .select('*, category(*)')
      .eq('meta->>vendor_name', p_vendor_name);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  private async getPayableSummary(
    p_vendor_name?: string,
  ): Promise<PayableTypes[]> {
    const { data, error } = await this.supabase.rpc('get_payable_summary', {
      p_vendor_name,
    });

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  private mapPayableToPayableReceivable(
    summaryData: PayableTypes[],
    cashflow: CashflowDbPopulated<PayableCashflowMeta>[],
  ): PayableReceivable {
    const data = summaryData[0];
    if (!data) throw new Error('Data tidak sesuai');
    const summary: PayableReceivableSummary = {
      counterpart_name: data.vendor_name,
      paid: data.paid,
      rest: data.rest,
      status: data.status,
      total: data.total,
      type: data.type,
    };

    const detail: PayableReceivableDetail[] = cashflow.map((data) => ({
      category: data.category.name,
      category_id: data.category.id,
      id: data.id,

      price:data.price,
      product_service: data.product_service,
      status_cashflow: data.status_cashflow,
      transaction_at: data.transaction_at,
      transfer_group_id: data.transfer_group_id,
      via: data.via,
    }));
    return {
      summary,
      detail,
    };
  }

  async getPayableDetail(p_vendor_name?: string) {
    const [payableSummary, cashflow] = await Promise.all([
      this.getPayableSummary(p_vendor_name),
      this.getPayableCashflowDetail(p_vendor_name),
    ]);

    const mappedData = this.mapPayableToPayableReceivable(
      payableSummary,
      cashflow,
    );

    return mappedData;
  }

  // >>>>>> PAYABLE SECTION END <<<<<<

  // >>>>>> RECEIVABLE SECTION START <<<<<<

  private async getReceivableCashflowDetail(
    p_customer_name?: string,
  ): Promise<CashflowDbPopulated<ReceivableCashflowMeta>[]> {
    if (!p_customer_name)
      throw new BadRequestException('Nama customer wajib diisi');

    const { data, error } = await this.supabase
      .from('cashflow')
      .select('*, category(*)')
      .eq('meta->>customer_name', p_customer_name);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  private async getReceivableSummary(
    p_customer_name?: string,
  ): Promise<ReceivableTypes[]> {
    const { data, error } = await this.supabase.rpc('get_receivable_summary', {
      p_customer_name,
    });

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  private mapReceivableToPayableReceivable(
    summaryData: ReceivableTypes[],
    cashflow: CashflowDbPopulated<ReceivableCashflowMeta>[],
  ): PayableReceivable {
    const data = summaryData[0];
    if (!data) throw new Error('Data tidak sesuai');
    const summary: PayableReceivableSummary = {
      counterpart_name: data.customer_name,
      paid: data.paid,
      rest: data.rest,
      status: data.status,
      total: data.total,
      type: data.type,
    };

    const detail: PayableReceivableDetail[] = cashflow.map((data) => ({
      category: data.category.name,
      category_id: data.category.id,
      id: data.id,

      price: data.price,
      product_service: data.product_service,
      status_cashflow: data.status_cashflow,
      transaction_at: data.transaction_at,
      transfer_group_id: data.transfer_group_id,
      via: data.via,
    }));
    return {
      summary,
      detail,
    };
  }

  async getReceivableDetail(p_customer_name?: string) {
    const [recevaibleSummary, cashflow] = await Promise.all([
      this.getReceivableSummary(p_customer_name),
      this.getReceivableCashflowDetail(p_customer_name),
    ]);

    const mappedData = this.mapReceivableToPayableReceivable(
      recevaibleSummary,
      cashflow,
    );

    return mappedData;
  }

  // >>>>>> RECEIVABLE SECTION END <<<<<<

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
