import { Inject, Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from '../dto/create-purchase.dto';
import { PurchaseInsert } from '../interface/purchase.interface';
import { UpdatePurchaseDto } from '../dto/update-purchase.dto';
import { CreatePurchaseItemDto } from '../dto/create-purchase-item.dto';
import { PurchaseItemInsert } from '../interface/purchase-items.interface';
import { formatDateYYYYMMDD } from '../../../utils/format-date';
import { SupabaseClient } from '@supabase/supabase-js';
import { ProductFetchService } from '../../products/helpers/products-fetch.service';

@Injectable()
export class PurchaseMapperService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
    private readonly productFetcher: ProductFetchService,
  ) {}

  private async generatePurchaseCode(date: Date): Promise<string> {
    const dateStr = formatDateYYYYMMDD(date);
    const prefix = `PUR-${dateStr}-`;

    const { data } = await this.supabase
      .from('purchases')
      .select('purchase_code')
      .ilike('purchase_code', `${prefix}%`)
      .order('purchase_code', { ascending: false })
      .limit(1)
      .maybeSingle();

    let nextNumber = 1;

    if (data?.purchase_code) {
      const lastNumber = Number(data.purchase_code.split('-').pop());
      nextNumber = lastNumber + 1;
    }

    return `${prefix}${String(nextNumber).padStart(4, '0')}`;
  }

  async mapToPurchaseDb(raw: CreatePurchaseDto): Promise<PurchaseInsert> {
    const code = await this.generatePurchaseCode(new Date(raw.purchase_date));
    return {
      notes: raw.notes,
      purchase_date: raw.purchase_date,
      supplier_name: raw.supplier_name,
      supplier_type: raw.supplier_type,
      purchase_code: code,
      purchase_type: raw.purchase_type,
      purchase_status: raw.purchase_status,
      updated_at: new Date().toISOString()
    };
  }

  mapToPurchaseUpdateDb(raw: UpdatePurchaseDto): Partial<PurchaseInsert> {
    const payload: Partial<PurchaseInsert> = {};

    if (raw.purchase_date) {
      payload.purchase_date = raw.purchase_date;
    }

    if (raw.supplier_name !== undefined) {
      payload.supplier_name = raw.supplier_name;
    }

    if (raw.supplier_type !== undefined) {
      payload.supplier_type = raw.supplier_type;
    }

    if (raw.notes !== undefined) {
      payload.notes = raw.notes;
    }

    return payload;
  }

  async mapToPurchaseItemDb(
    raw: CreatePurchaseItemDto,
    purchaseId: string,
  ): Promise<PurchaseItemInsert> {
    const hpp = raw.price / raw.quantity;
    const product = await this.productFetcher.findById(raw.product_id);
    return {
      purchase_id: purchaseId,
      price: raw.price,
      quantity: raw.quantity,
      hpp,
      product_id: raw.product_id,
      product_name: product[0]?.name ?? '',
      remaining_quantity: raw.quantity,
    };
  }
}
