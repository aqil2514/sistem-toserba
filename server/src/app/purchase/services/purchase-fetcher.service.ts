import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class PurchaseFetcherService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async getSupplierName(): Promise<string[]> {
    const { data, error } = await this.supabase
      .from('purchase_supplier_name')
      .select('supplier_name')
      .neq('supplier_name', null);

    if (error) {
      console.error(error);
      throw error;
    }

    const mappedData = data.map((d) => d.supplier_name);

    return mappedData;
  }

  async getSupplierType(): Promise<string[]> {
    const { data, error } = await this.supabase
      .from('purchase_supplier_type')
      .select('supplier_type')
      .neq('supplier_type', null);

    if (error) {
      console.error(error);
      throw error;
    }

    const mappedData = data.map((d) => d.supplier_type);

    return mappedData;
  }
}
