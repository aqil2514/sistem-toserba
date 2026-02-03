import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CashflowCategoryInsert } from '../types/cashflow-category.types';
import { CashflowDbInsert } from '../types/cashflow.types';
import { CashflowDto } from '../dto/cashflow.dto';
import { CashflowCategoryDto } from '../dto/cashflow-category.dto';

@Injectable()
export class CashflowFormService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  private mapCasflowCategoryDtoToDb(
    raw: CashflowCategoryDto,
  ): CashflowCategoryInsert {
    return {
      name: raw.name,
      status: raw.status as CashflowCategoryInsert['status'],
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
      price: raw.price,
      product_service: raw.product_service,
      transaction_at: raw.transaction_at,
      via: raw.via,
    };
  }

  async createNewCashflowData(payload: CashflowDto) {
    const { category } = payload;

    const mappedCategory = this.mapCasflowCategoryDtoToDb(category);

    const categoryId =
      await this.createNewCashflowCategoryIfNoExist(mappedCategory);

    const mappedCashflow = this.mapCashflowDtoToDb(payload, categoryId);

    await this.createNewCashflow(mappedCashflow);
  }

  async createNewCashflow(payload: CashflowDbInsert) {
    const { error } = await this.supabase.from('cashflow').insert(payload);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  async createNewCashflowCategoryIfNoExist(
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
}
