import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PurchaseInsert } from '../../interface/purchase.interface';
import { PurchaseItemInsert } from '../../interface/items/purchase-items.interface';
import { PurchaseAssetsDbInsert } from '../../interface/items/purchase-assets.interface';
import { PurchaseConsumablesDbInsert } from '../../interface/items/purchase-consumables.interface';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class PurchaseCreatorService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async createHeaderPurchase(headerData: PurchaseInsert): Promise<string> {
    const { data, error } = await this.supabase
      .from('purchases')
      .insert(headerData)
      .select('id')
      .maybeSingle();

    if (error) {
      console.error(error);
      throw error;
    }

    if (!data) throw new NotFoundException('Data tidak ditemukan');

    return data.id;
  }

  async createNewPurchaseItems(items: PurchaseItemInsert[]) {
    const { error } = await this.supabase.from('purchase_items').insert(items);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  async createNewPurchaseAssets(assets: PurchaseAssetsDbInsert[]) {
    const { error } = await this.supabase
      .from('purchase_assets')
      .insert(assets);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  async createNewPurchaseConsumables(
    consumables: PurchaseConsumablesDbInsert[],
  ) {
    const { error } = await this.supabase
      .from('purchase_consumables')
      .insert(consumables);

    if (error) {
      console.error(error);
      throw error;
    }
  }
}
