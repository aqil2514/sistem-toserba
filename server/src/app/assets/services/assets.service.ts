import { Injectable } from '@nestjs/common';
import { PurchaseAssetsDb } from '../../../app/purchase/interface/items/purchase-assets.interface';
import { TableName } from '../../../services/supabase/enums/table-name.enum';
import { SupabaseRepositoryService } from '../../../services/supabase/supabase.service';

@Injectable()
export class AssetsService {
  constructor(private readonly supabase: SupabaseRepositoryService) {}

  async getAllAssets() {
    const assets = await this.supabase.getAllData<PurchaseAssetsDb>({
      tableName: TableName.PURCHASE_ASSETS,
      deletedColumn: 'deleted_at',
      select:
        '*, purchase:purchase_id(supplier_name,purchase_date,notes,purchase_code,purchase_status,supplier_type)',
    });

    return assets;
  }

  async updateAssetCondition(id: string, newCondition: string) {
    await this.supabase.updateData(TableName.PURCHASE_ASSETS, 'id', id, {
      condition: newCondition,
    });
  }
}
