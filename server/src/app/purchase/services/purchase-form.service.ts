import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { UpdatePurchaseDto } from '../dto/update-purchase.dto';
import { CreatePurchaseDto } from '../dto/create-purchase.dto';
import { PurchaseMapperService } from './purchase-mapper.service';
import { PurchaseActivityService } from './purchase-activity.service';
import { PurchaseFetcherService } from './purchase-fetcher.service';
import { PurchaseItemInsert } from '../interface/purchase-items.interface';
import { PurchaseInsert } from '../interface/purchase.interface';

@Injectable()
export class PurchaseFormService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
    private readonly mapperService: PurchaseMapperService,
    private readonly activityService: PurchaseActivityService,
    private readonly fetcherService: PurchaseFetcherService,
  ) {}

  async createPurchase(purchaseDto: CreatePurchaseDto) {
    const mappedPurchase =
      await this.mapperService.mapToPurchaseDb(purchaseDto);

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
        this.mapperService.mapToPurchaseItemDb(val, purchase.id),
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

    await this.activityService.createPurchaseActivity(
      mappedPurchase,
      mappedItem,
      purchase.id,
    );

    return {
      message: 'Berhasil tambah data',
      purchaseId: purchase.id,
    };
  }

  async updatePurchase(purchaseId: string, dto: UpdatePurchaseDto) {
    const [oldPurchase, oldItems] = await Promise.all([
      this.fetcherService.getPurchaseById(purchaseId),
      this.fetcherService.getPurchaseItemByPurchaseId(purchaseId),
    ]);

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
    const mappedPurchase = this.mapperService.mapToPurchaseUpdateDb({
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

    const newItems: PurchaseItemInsert[] = []; // Buat log aktivitas
    // 4️⃣ Insert item BARU (jika ada)
    if (dto.items && dto.items.length > 0) {
      const mappedItems = await Promise.all(
        dto.items.map((item) =>
          this.mapperService.mapToPurchaseItemDb(item, purchaseId),
        ),
      );

      newItems.push(...mappedItems);

      const { error: insertItemError } = await this.supabase
        .from('purchase_items')
        .insert(mappedItems);

      if (insertItemError) {
        console.error(insertItemError);

        await this.supabase
          .from('purchase_items')
          .update({ deleted_at: null })
          .eq('purchase_id', purchaseId)
          .eq('deleted_at', deletedAt);

        throw new InternalServerErrorException('Gagal menambahkan item baru');
      }
    }

    await this.activityService.updatePurchaseActivity(
      mappedPurchase as PurchaseInsert,
      oldPurchase,
      newItems,
      oldItems,
      purchaseId,
    );

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
    const [beforeDeletedPurchase, beforeDeletedItems] = await Promise.all([
      this.fetcherService.getPurchaseById(purchaseId),
      this.fetcherService.getPurchaseItemByPurchaseId(purchaseId),
    ]);

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

    await this.activityService.deletePurchaseActivity(
      beforeDeletedPurchase,
      beforeDeletedItems,
      purchaseId,
    );

    return {
      message: 'Purchase berhasil dihapus',
    };
  }
}
