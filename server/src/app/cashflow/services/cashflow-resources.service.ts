import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class CashflowResourcesService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async getVendorName() {
    const { data, error } = await this.supabase.from('vendor_name').select('*');

    if (error) {
      console.error(error);
      throw error;
    }

    const vendorName = data.map((vendor) => vendor.vendor_name);

    return vendorName;
  }
}
