import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { MappedResponse } from './dto/purchase-response';

@Injectable()
export class PurchaseService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async findAll() {
    const { data, error } = await this.supabase
      .from('purchases')
      .select('*')
      .is('deleted_at', null)
      .order('purchase_date');

    if (error) throw error;
    return data;
  }

  async findByIdWithItems(purchaseId: string) {
    const { data, error } = await this.supabase
      .from('purchase_items')
      .select('*, product_id(*), purchase_id(*)')
      .eq('purchase_id', purchaseId);

    if (error) throw error;

    const mappedItems: MappedResponse[] | undefined =
      data?.map((val) => {
        const name = val.product_id.name;
        const price = val.price;
        const quantity = val.quantity;
        const remaining_quantity = val.remaining_quantity;
        const id = val.id;
        return {
          id,
          name,
          price,
          quantity,
          remaining_quantity,
          unit: val.product_id.unit,
          hpp: val.hpp,
        };
      }) ?? [];

    return mappedItems;
  }
}
