import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

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
}
