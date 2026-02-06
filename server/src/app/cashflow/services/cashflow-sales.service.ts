import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  endOfTodayUtcJakarta,
  startOfTodayUtcJakarta,
} from '../../../utils/format-date';
import { applyDateRangeFilter } from '../../../utils/query-builder';
import {
  CashflowSalesReceivableMeta,
  CashflowSalesReturnDb,
} from '../types/cashflow-sales.types';
import { CashflowDbInsert } from '../types/cashflow.types';

@Injectable()
export class CashflowSalesService {
  private readonly trading_income_category_id =
    'e519e6a7-d954-4d60-a7f0-409c481055df';
  private readonly receivable_category_id =
    'c07cef55-f6bb-4396-bd6a-56a6d368455e';

  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async createNewCashflowFromSales() {
    const data = await this.getCurrentSales();
    const { cashPayment, receivablePayment } =
      this.splitDataPerPaymentMethod(data);

    const mappedCashPayment = this.mapCashPaymentToCashflowDb(cashPayment);
    const mappedReceivablePayment =
      this.mapReceivablePaymentToCashflowDb(receivablePayment);

    const existingCashPaymentId = await this.existingCashPaymentId();

    if (!existingCashPaymentId) {
      await this.saveToDb(mappedCashPayment);
    } else {
      await this.editDataDb(mappedCashPayment.price, existingCashPaymentId);
    }

    for (const receivablePayment of mappedReceivablePayment) {
      const existingReceivablePaymentId =
        await this.existingReceivablePaymentId(receivablePayment);

      if (!existingReceivablePaymentId) {
        await this.saveToDb(receivablePayment);
      } else {
        await this.editDataDb(
          receivablePayment.price,
          existingReceivablePaymentId,
        );
      }
    }
  }

  private async getCurrentSales(): Promise<CashflowSalesReturnDb[]> {
    let client = this.supabase
      .from('sales')
      .select('total_amount, payment_method, customer_name');

    client = applyDateRangeFilter(
      client,
      'transaction_at',
      startOfTodayUtcJakarta(),
      endOfTodayUtcJakarta(),
    );

    const { data, error } = await client;

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  private async existingCashPaymentId(): Promise<string | null> {
    let client = this.supabase
      .from('cashflow')
      .select('id')
      .eq('via', 'Tunai')
      .eq('source', 'sales')
      .eq('status_cashflow', 'income');

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

    return data.id;
  }

  private async existingReceivablePaymentId(
    mappedData: CashflowDbInsert,
  ): Promise<string | null> {
    const meta = mappedData.meta as CashflowSalesReceivableMeta;

    let client = this.supabase
      .from('cashflow')
      .select('id')
      .eq('source', 'sales')
      .eq('meta->>customer_name', meta.customer_name);

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

    return data.id;
  }

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
      .update({ price })
      .eq('id', cashflowId);
    if (error) {
      console.error(error);
      throw error;
    }
  }

  private mapCashPaymentToCashflowDb(
    sales: CashflowSalesReturnDb[],
  ): CashflowDbInsert {
    const price = sales.reduce((acc, curr) => acc + curr.total_amount, 0);
    return {
      source: 'sales',
      category: this.trading_income_category_id,
      note: 'Dibuat otomatis melalui Sales',
      transaction_at: new Date().toISOString(),
      product_service: 'Omzet',
      status_cashflow: 'income',
      via: 'Tunai',
      price,
    };
  }

  private mapReceivablePaymentToCashflowDb(
    sales: CashflowSalesReturnDb[],
  ): CashflowDbInsert[] {
    const dbInsert: CashflowDbInsert[] = [];
    const customerNameSet = new Set<string>(
      sales.map((sale) => sale.customer_name),
    );
    const customerNames = Array.from(customerNameSet);

    for (const customer of customerNames) {
      const selectedData = sales.filter(
        (sale) => sale.customer_name === customer,
      );
      const price = selectedData.reduce(
        (acc, curr) => acc + curr.total_amount,
        0,
      );

      const data: CashflowDbInsert<CashflowSalesReceivableMeta> = {
        category: this.receivable_category_id,
        note: 'Otomatis diisi melalui Sales',
        price,
        product_service: `Piutang | ${customer}`,
        status_cashflow: 'receivable',
        transaction_at: new Date().toISOString(),
        via: 'Piutang',
        source: 'sales',
        meta: { customer_name: customer },
      };

      dbInsert.push(data);
    }

    return dbInsert;
  }

  private splitDataPerPaymentMethod(sales: CashflowSalesReturnDb[]) {
    const cashPayment: CashflowSalesReturnDb[] = [];
    const receivablePayment: CashflowSalesReturnDb[] = [];
    for (const sale of sales) {
      switch (sale.payment_method) {
        case 'cash':
          cashPayment.push(sale);
          break;
        case 'utang':
          receivablePayment.push(sale);
          break;

        default:
          break;
      }
    }

    return { cashPayment, receivablePayment };
  }
}
