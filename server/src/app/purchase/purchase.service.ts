import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { MappedResponse } from './dto/purchase-response';
import { Purchase, PurchaseInsert } from './interface/purchase.interface';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { formatDateYYYYMMDD } from '../../utils/format-date';
import { CreatePurchaseItemDto } from './dto/create-purchase-item.dto';
import { PurchaseItemInsert } from './interface/purchase-items.interface';
import { ProductsService } from '../products/products.service';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PurchaseQuery } from './interface/purchase-query.interface';
import { DataQueryResponse } from '../../@types/general';
import {
  applyDateRangeFilter,
  applyPagination,
  buildPaginationMeta,
  executeSupabaseBasicQuery,
} from '../../utils/query-builder';
import { ProductFetchService } from '../products/helpers/products-fetch.service';

@Injectable()
export class PurchaseService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
    private readonly productFetchService: ProductFetchService,
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

  private async mapToPurchaseDb(
    raw: CreatePurchaseDto,
  ): Promise<PurchaseInsert> {
    const code = await this.generatePurchaseCode(new Date(raw.purchase_date));
    return {
      notes: raw.notes,
      purchase_date: raw.purchase_date,
      supplier_name: raw.supplier_name,
      supplier_type: raw.supplier_type,
      purchase_code: code,
    };
  }

  private mapToPurchaseUpdateDb(
    raw: UpdatePurchaseDto,
  ): Partial<PurchaseInsert> {
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

  private async mapToPurchaseItemDb(
    raw: CreatePurchaseItemDto,
    purchaseId: string,
  ): Promise<PurchaseItemInsert> {
    const hpp = raw.price / raw.quantity;
    const product = await this.productFetchService.findById(raw.product_id);
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

  async findAll() {
    const { data, error } = await this.supabase
      .from('purchases')
      .select('*')
      .is('deleted_at', null)
      .order('purchase_date');

    if (error) throw error;
    return data;
  }

  async findByQuery(
    query: PurchaseQuery,
  ): Promise<DataQueryResponse<Purchase[]>> {
    const { limit, page } = query;

    let supabase = this.supabase
      .from('purchases')
      .select('*', { count: 'exact' })
      .is('deleted_at', null);

    const client = executeSupabaseBasicQuery(supabase, query, "purchase_date"); 

    const { data, error, count } = await client;
    if (error) {
      console.error(error);
      throw new InternalServerErrorException('Terjadi error saat mencari data');
    }

    const meta = buildPaginationMeta(page, limit, count ?? 0);

    return {
      data,
      meta,
    };
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
          product_id: val.product_id.id,
        };
      }) ?? [];

    return mappedItems;
  }

  async createPurchase(purchaseDto: CreatePurchaseDto) {
    const mappedPurchase = await this.mapToPurchaseDb(purchaseDto);

    const { data: purchase, error: purchaseError } = await this.supabase
      .from('purchases')
      .insert(mappedPurchase)
      .select()
      .single();

    if (purchaseError) {
      console.error(purchaseError);
      throw new InternalServerErrorException(
        'Terjadi kesalahan saat tambah purchase data',
      );
    }

    const mappedItem = await Promise.all(
      purchaseDto.items.map(async (val) =>
        this.mapToPurchaseItemDb(val, purchase.id),
      ),
    );

    const { error: itemError } = await this.supabase
      .from('purchase_items')
      .insert(mappedItem);

    if (itemError) {
      await this.supabase.from('purchases').delete().eq('id', purchase.id);

      throw new InternalServerErrorException(
        'Terjadi kesalahan saat tambah purchase item data',
      );
    }

    return {
      message: 'Berhasil tambah data',
    };
  }

  async updatePurchase(purchaseId: string, dto: UpdatePurchaseDto) {
    // 1️⃣ Pastikan purchase ada & belum dihapus
    const { data: existing, error: findError } = await this.supabase
      .from('purchases')
      .select('id')
      .eq('id', purchaseId)
      .is('deleted_at', null)
      .maybeSingle();

    if (findError || !existing) {
      throw new NotFoundException('Purchase tidak ditemukan');
    }

    // 2️⃣ Update HEADER purchase
    const mappedPurchase = this.mapToPurchaseUpdateDb({
      ...dto,
    });

    if (Object.keys(mappedPurchase).length === 0)
      throw new BadRequestException('Tidak ada perubahan data header');

    const { data: purchase, error: updateError } = await this.supabase
      .from('purchases')
      .update(mappedPurchase)
      .eq('id', purchaseId)
      .select()
      .maybeSingle();

    if (updateError) {
      console.error(updateError);
      throw new InternalServerErrorException('Gagal update data purchase');
    }

    if (!purchase) {
      throw new NotFoundException('Purchase tidak ditemukan');
    }

    // 3️⃣ Hard delete item lama
    const deletedAt = new Date().toISOString();

    const { error: hardDeleteError } = await this.supabase
      .from('purchase_items')
      .delete()
      .eq('purchase_id', purchaseId)
      .is('deleted_at', null);

    if (hardDeleteError) {
      console.error(hardDeleteError);
      throw new InternalServerErrorException('Gagal menghapus item lama');
    }

    // 4️⃣ Insert item BARU (jika ada)
    if (dto.items && dto.items.length > 0) {
      const mappedItems = await Promise.all(
        dto.items.map((item) => this.mapToPurchaseItemDb(item, purchaseId)),
      );

      const { error: insertItemError } = await this.supabase
        .from('purchase_items')
        .insert(mappedItems);

      if (insertItemError) {
        console.error(insertItemError);

        // rollback minimal (opsional tapi aman)
        await this.supabase
          .from('purchase_items')
          .update({ deleted_at: null })
          .eq('purchase_id', purchaseId)
          .eq('deleted_at', deletedAt);

        throw new InternalServerErrorException('Gagal menambahkan item baru');
      }
    }

    return {
      purchase,
      message: 'Purchase berhasil diperbarui',
    };
  }

  async updateQuantityRemaining(
    purchase_item_id: string,
    remaining_quantity: number,
  ) {
    const { error } = await this.supabase
      .from('purchase_items')
      .update({ remaining_quantity })
      .eq('id', purchase_item_id);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  async softDeletePurchase(purchaseId: string) {
    const deletedAt = new Date().toISOString();

    // 1. Soft delete purchase
    const { data: purchase, error: purchaseError } = await this.supabase
      .from('purchases')
      .update({ deleted_at: deletedAt })
      .eq('id', purchaseId)
      .is('deleted_at', null)
      .select()
      .single();

    if (purchaseError || !purchase) {
      throw new NotFoundException('Purchase tidak ditemukan');
    }

    // 2. Soft delete purchase items
    const { error: itemError } = await this.supabase
      .from('purchase_items')
      .update({ deleted_at: deletedAt })
      .eq('purchase_id', purchaseId)
      .is('deleted_at', null);

    if (itemError) {
      console.error(itemError);
      throw new InternalServerErrorException(
        'Gagal soft delete purchase items',
      );
    }

    return {
      message: 'Purchase berhasil dihapus',
    };
  }
}
