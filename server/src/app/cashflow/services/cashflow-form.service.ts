import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CashflowCategoryInsert } from '../types/cashflow-category.types';
import {
  CashflowCategoryStatus,
  CashflowDbInsert,
} from '../types/cashflow.types';
import { CashflowDto } from '../dto/cashflow.dto';
import { CashflowCategoryDto } from '../dto/cashflow-category.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CashflowFormService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  private mapCashflowCategoryDtoToDb(
    raw: CashflowCategoryDto,
  ): CashflowCategoryInsert {
    return {
      name: raw.name,
      description: raw.description,
    };
  }

  private mapCashflowDtoToDb(
    raw: CashflowDto,
    categoryId: string,
  ): CashflowDbInsert {
    return {
      category: categoryId,
      note: raw.note,
      status_cashflow: raw.category.status as CashflowCategoryStatus,
      price: raw.price,
      product_service: raw.product_service,
      transaction_at: raw.transaction_at,
      via: raw.via,
    };
  }

  private mapTransferCasfhlotDtoToDb(
    raw: CashflowDto,
    categoryId: string,
  ): CashflowDbInsert[] {
    const transfer_group_id = randomUUID();
    const fromAssetTransfer: CashflowDbInsert = {
      category: categoryId,
      status_cashflow: 'expense',
      note: raw.note,
      price: raw.price,
      product_service: raw.product_service,
      transaction_at: raw.transaction_at,
      via: raw.from_asset,
      transfer_group_id,
    };

    const toAssetTransfer: CashflowDbInsert = {
      category: categoryId,
      status_cashflow: 'income',
      note: raw.note,
      price: raw.price,
      product_service: raw.product_service,
      transaction_at: raw.transaction_at,
      via: raw.to_asset,
      transfer_group_id,
    };

    const transferFee: CashflowDbInsert | null =
      raw.transfer_fee && raw.transfer_fee > 0
        ? {
            category: categoryId,
            status_cashflow: 'expense',
            note: raw.note,
            price: raw.transfer_fee,
            product_service: 'Biaya Transfer',
            transaction_at: raw.transaction_at,
            via: raw.from_asset,
            transfer_group_id,
          }
        : null;

    return [
      fromAssetTransfer,
      toAssetTransfer,
      ...(transferFee ? [transferFee] : []),
    ];
  }

  private async createNewCashflow(
    payload: CashflowDbInsert | CashflowDbInsert[],
  ) {
    const { error } = await this.supabase.from('cashflow').insert(payload);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  private async createNewCashflowCategoryIfNoExist(
    payload: CashflowCategoryInsert,
  ): Promise<string> {
    const { data: fetch_data, error: error_fetch } = await this.supabase
      .from('cashflow_category')
      .select('name, id')
      .eq('name', payload.name)
      .maybeSingle();

    if (error_fetch) {
      console.error(error_fetch);
      throw error_fetch;
    }

    if (fetch_data) return fetch_data.id;

    const { error, data } = await this.supabase
      .from('cashflow_category')
      .insert(payload)
      .select('id')
      .single();

    if (error) {
      console.error(error);
      throw error;
    }

    return data.id;
  }

  async createNewCashflowData(payload: CashflowDto) {
    const { category } = payload;

    const mappedCategory = this.mapCashflowCategoryDtoToDb(category);

    const categoryId =
      await this.createNewCashflowCategoryIfNoExist(mappedCategory);

    const mappedCashflow =
      category.status === 'transfer'
        ? this.mapTransferCasfhlotDtoToDb(payload, categoryId)
        : this.mapCashflowDtoToDb(payload, categoryId);

    await this.createNewCashflow(mappedCashflow);
  }
}
