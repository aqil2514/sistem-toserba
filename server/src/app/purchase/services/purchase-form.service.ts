import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreatePurchaseDto } from '../dto/create-purchase.dto';
import { PurchaseMapperService } from './helper/purchase-mapper.service';
import { PurchaseActivityService } from './purchase-activity.service';
import { PurchaseFetcherService } from './purchase-fetcher.service';
import { PurchaseType } from '../interface/purchase.interface';
import { PurchaseCreatorService } from './helper/purchase-creator.service';
import { PurchaseUpdateService } from './helper/purchase-updater.service';
import { TableInsertMap } from '../interface/purchase-api.interface';

@Injectable()
export class PurchaseFormService {
  private itemTableName: Record<PurchaseType, keyof TableInsertMap> = {
    assets: 'purchase_assets',
    consumable: 'purchase_consumables',
    stock: 'purchase_items',
  };

  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
    private readonly mapperService: PurchaseMapperService,
    private readonly activityService: PurchaseActivityService,
    private readonly fetcherService: PurchaseFetcherService,
    private readonly creatorService: PurchaseCreatorService,
    private readonly updaterService: PurchaseUpdateService,
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

      await this.creatorService.createNewItems(
        this.itemTableName[mappedHeader.purchase_type],
        mappedItems,
      );
    } catch (error) {
      await this.supabase.from('purchases').delete().eq('id', purchaseId);
      throw error;
    }
  }

  async updatePurchase(oldPurchaseId: string, purchaseDto: CreatePurchaseDto) {
    const { purchase_code } =
      await this.updaterService.getOldCode(oldPurchaseId);
    if (!purchase_code)
      throw new NotFoundException('Data pembelian tidak ditemukan');
    const mappedHeader = await this.mapperService.mapToPurchaseDb(
      purchaseDto,
      purchase_code,
    );
    const mappedItems = await Promise.all(
      purchaseDto.items.map((item) =>
        this.mapperService.mapToPurchaseItemByType(
          item,
          oldPurchaseId,
          mappedHeader.purchase_type,
        ),
      ),
    );

    await Promise.all([
      this.updaterService.updatePurchaseHeader(oldPurchaseId, mappedHeader),
      this.updaterService.hardDeleteItems(
        oldPurchaseId,
        this.itemTableName[mappedHeader.purchase_type],
      ),
    ]);

    await this.creatorService.createNewItems(
      this.itemTableName[mappedHeader.purchase_type],
      mappedItems,
    );
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
