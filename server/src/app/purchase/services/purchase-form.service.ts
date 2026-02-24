import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreatePurchaseDto } from '../dto/create-purchase.dto';
import { PurchaseMapperService } from './helper/purchase-mapper.service';
import { PurchaseActivityService } from './purchase-activity.service';
import { PurchaseType } from '../interface/purchase.interface';
import { PurchaseUpdateService } from './helper/purchase-updater.service';
import { SupabaseRepositoryService } from '../../../services/supabase/supabase.service';
import { TableName } from 'src/services/supabase/enums/table-name.enum';

@Injectable()
export class PurchaseFormService {
  private itemTableName: Record<PurchaseType, TableName> = {
    assets: TableName.PURCHASE_ASSETS,
    consumable: TableName.PURCHASE_CONSUMABLES,
    stock: TableName.PURCHASE_ITEMS,
  };

  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
    private readonly mapperService: PurchaseMapperService,
    private readonly activityService: PurchaseActivityService,
    private readonly updaterService: PurchaseUpdateService,
    private readonly dbService: SupabaseRepositoryService,
  ) {}

  async createNewPurchase(purchaseDto: CreatePurchaseDto) {
    const { items, purchase_type } = purchaseDto;
    const mappedHeader = await this.mapperService.mapToPurchaseDb(purchaseDto);
    const purchaseId = await this.dbService.createNewDataAndSelectId(
      TableName.PURCHASES,
      mappedHeader,
    );

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

      await this.dbService.createNewData(
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
      this.dbService.updateData(
        TableName.PURCHASES,
        mappedHeader,
        'id',
        oldPurchaseId,
      ),
      this.dbService.hardDelete(
        this.itemTableName[mappedHeader.purchase_type],
        oldPurchaseId,
        'purchase_id',
      ),
    ]);

    await this.dbService.createNewData(
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

  async softDeletePurchase(purchaseId: string, purchase_type: PurchaseType) {
    await Promise.all([
      this.dbService.softDelete(TableName.PURCHASES, 'id', purchaseId),
      this.dbService.softDelete(
        this.itemTableName[purchase_type],
        'purchase_id',
        purchaseId,
      ),
    ]);
    return;
  }
}
