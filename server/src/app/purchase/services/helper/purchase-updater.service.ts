import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { PurchaseInsert } from '../../interface/purchase.interface';
import { PurchaseItemTableName } from '../../interface/purchase-api.interface';

@Injectable()
export class PurchaseUpdateService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async getOldCode(purchaseId: string) {
    const { data, error } = await this.supabase
      .from('purchases')
      .select('id, purchase_code')
      .eq('id', purchaseId)
      .is('deleted_at', null)
      .maybeSingle();

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  async updatePurchaseHeader(oldPurchaseId: string, newData: PurchaseInsert) {
    const { error } = await this.supabase
      .from('purchases')
      .update(newData)
      .eq('id', oldPurchaseId);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  async hardDeleteItems(
    oldPurchaseId: string,
    tableName: PurchaseItemTableName,
  ) {
    const { error } = await this.supabase
      .from(tableName)
      .delete()
      .eq('purchase_id', oldPurchaseId);

    if (error) {
      console.error(error);
      throw error;
    }
  }
}
