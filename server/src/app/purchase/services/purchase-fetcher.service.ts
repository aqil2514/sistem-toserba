import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Purchase } from '../interface/purchase.interface';
import { PurchaseItem } from '../interface/items/purchase-items.interface';

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

  async getProductName() {
    const { data, error } = await this.supabase
      .from('products')
      .select('id, name')
      .is("deleted_at", null);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  async getPurchaseById(purchase_id: string): Promise<Purchase> {
    const { data, error } = await this.supabase
      .from('purchases')
      .select('*')
      .eq('id', purchase_id)
      .maybeSingle();

    if (error) {
      console.error(error);
      throw error;
    }

    if (!data) throw new Error('Data tidak ditemukan');

    return data;
  }

  async getPurchaseItemByPurchaseId(
    purchase_id: string,
  ): Promise<PurchaseItem[]> {
    const { data, error } = await this.supabase
      .from('purchase_items')
      .select('*')
      .eq('purchase_id', purchase_id);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }
}
