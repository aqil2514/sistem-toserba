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
import { PurchaseMapperService } from './helper/purchase-mapper.service';
import { PurchaseActivityService } from './purchase-activity.service';
import { PurchaseFetcherService } from './purchase-fetcher.service';
import { PurchaseItemInsert } from '../interface/items/purchase-items.interface';
import { PurchaseInsert } from '../interface/purchase.interface';
import { PurchaseAssetsDbInsert } from '../interface/items/purchase-assets.interface';
import { PurchaseConsumablesDbInsert } from '../interface/items/purchase-consumables.interface';
import { PurchaseCreatorService } from './helper/purchase-creator.service';

@Injectable()
export class PurchaseFormService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
    private readonly mapperService: PurchaseMapperService,
    private readonly activityService: PurchaseActivityService,
    private readonly fetcherService: PurchaseFetcherService,
    private readonly creatorService: PurchaseCreatorService,
  ) {}

  async createNewPurchase(purchaseDto: CreatePurchaseDto) {
    const { items, purchase_type } = purchaseDto;
    const mappedHeader = await this.mapperService.mapToPurchaseDb(purchaseDto);
    const purchaseId =
      await this.creatorService.createHeaderPurchase(mappedHeader);

    try {
      const mappedItems = await Promise.all(
        items.map((item) =>
          this.mapperService.mapToPurchaseItemByType(
            item,
            purchaseId,
            purchase_type,
          ),
        ),
      );

      switch (purchase_type) {
        case 'stock':
          await this.creatorService.createNewPurchaseItems(
            mappedItems as PurchaseItemInsert[],
          );
          break;
        case 'assets':
          await this.creatorService.createNewPurchaseAssets(
            mappedItems as PurchaseAssetsDbInsert[],
          );
          break;
        case 'consumable':
          await this.creatorService.createNewPurchaseConsumables(
            mappedItems as PurchaseConsumablesDbInsert[],
          );
          break;
        default:
          throw new Error('Tipe data tidak dikenal');
      }
    } catch (error) {
      await this.supabase.from('purchases').delete().eq('id', purchaseId);
      throw error;
    }
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
