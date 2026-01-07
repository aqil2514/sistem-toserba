import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class PurchaseFormService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  private async getSupplier() {
    const { error, data } = await this.supabase
      .from('purchases')
      .select('supplier_name, supplier_type')
      .is('deleted_at', null);

    if (error) {
      console.error(error);
      throw error;
    }

    const supplierNameSet = new Set<string>(
      data.map((supplier) => supplier.supplier_name),
    );
    const supplierTypeSet = new Set<string>(
      data
        .map((supplier) => supplier.supplier_type)
        .filter((supplier) => supplier !== null),
    );

    return {
      supplierName: Array.from(supplierNameSet).sort(),
      supplierType: Array.from(supplierTypeSet).sort(),
    };
  }

  private async getProducts() {
    const { error, data } = await this.supabase
      .from('products')
      .select('id, name')
      .is('deleted_at', null);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  async getPurchaseFormResources() {
    const [supplier, products] = await Promise.all([
      this.getSupplier(),
      this.getProducts(),
    ]);

    return {
      supplier,
      products,
    };
  }
}
