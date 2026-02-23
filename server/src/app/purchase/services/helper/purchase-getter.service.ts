import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { PurchaseItem } from '../../interface/items/purchase-items.interface';
import { PurchaseConsumablesDb } from '../../interface/items/purchase-consumables.interface';
import { PurchaseAssetsDb } from '../../interface/items/purchase-assets.interface';
import { Purchase } from '../../interface/purchase.interface';

@Injectable()
export class PurchaseGetterService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async getPurchaseById(purchaseId: string): Promise<Purchase | null> {
    const { data, error } = await this.supabase
      .from('purchases')
      .select('*')
      .eq('id', purchaseId)
      .maybeSingle();

    if (error) {
      console.error(error);
      throw error;
    }

    if (!data) return null;

    return data;
  }

  async getPurchaseItemsByPurchaseId(
    purchaseId: string,
  ): Promise<PurchaseItem[]> {
    const { error, data } = await this.supabase
      .from('purchase_items')
      .select('*')
      .eq('purchase_id', purchaseId);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  async getPurchaseConsumablesByPurchaseId(
    purchaseId: string,
  ): Promise<PurchaseConsumablesDb[]> {
    const { error, data } = await this.supabase
      .from('purchase_consumables')
      .select('*')
      .eq('purchase_id', purchaseId);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  async getPurchaseAssetsByPurchaseId(
    purchaseId: string,
  ): Promise<PurchaseAssetsDb[]> {
    const { error, data } = await this.supabase
      .from('purchase_assets')
      .select('*')
      .eq('purchase_id', purchaseId);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }
}
