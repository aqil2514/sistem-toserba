import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { MappedResponse } from '../dto/purchase-response';
import {
  Purchase,
  PurchaseInsert,
  PurchaseType,
} from '../interface/purchase.interface';
import { CreatePurchaseDto } from '../dto/create-purchase.dto';
import { formatDateYYYYMMDD } from '../../../utils/format-date';
import { CreatePurchaseItemDto } from '../dto/items/create-purchase-item.dto';
import { PurchaseItemInsert } from '../interface/items/purchase-items.interface';
import { UpdatePurchaseDto } from '../dto/update-purchase.dto';
import { DataQueryResponse } from '../../../@types/general';
import {
  buildPaginationMeta,
  executeSupabaseBasicQuery,
} from '../../../utils/query-builder';
import { ProductFetchService } from '../../products/helpers/products-fetch.service';
import { BasicQueryDto } from '../../../services/query/dto/query.dto';
import { BasicQueryService } from '../../../services/query/query.service';
import { PurchaseGetterService } from './helper/purchase-getter.service';
import {
  AnyItemTypes,
  PurchaseDetailReturn,
  PurchaseTypeItemMap,
} from '../interface/purchase-api.interface';

@Injectable()
export class PurchaseService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
    private readonly queryService: BasicQueryService,
    private readonly getterService: PurchaseGetterService,
  ) {}

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
    rawQuery: BasicQueryDto,
  ): Promise<DataQueryResponse<Purchase[]>> {
    const query = this.queryService.mapToBasicQuery(rawQuery);
    const { limit, page } = query;

    let supabase = this.supabase
      .from('purchases')
      .select('*', { count: 'exact' })
      .is('deleted_at', null);

    const client = executeSupabaseBasicQuery(supabase, query, 'purchase_date');

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

  async findByIdWithItems<K extends keyof PurchaseTypeItemMap>(
    purchaseId: string,
  ): Promise<PurchaseDetailReturn<K>> {
    const header = await this.getterService.getPurchaseById(purchaseId);
    const purchase_type = header.purchase_type as K;

    const itemByTipe: Record<PurchaseType, () => Promise<AnyItemTypes[]>> = {
      assets: () =>
        this.getterService.getPurchaseAssetsByPurchaseId(purchaseId),
      consumable: () =>
        this.getterService.getPurchaseConsumablesByPurchaseId(purchaseId),
      stock: () => this.getterService.getPurchaseItemsByPurchaseId(purchaseId),
    };

    const items = (await itemByTipe[purchase_type]()) as PurchaseTypeItemMap[K];
    return {
      header,
      type: purchase_type,
      items,
    };
  }
}
