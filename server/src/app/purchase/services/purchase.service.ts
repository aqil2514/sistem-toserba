import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { MappedResponse } from '../dto/purchase-response';
import { Purchase, PurchaseInsert } from '../interface/purchase.interface';
import { CreatePurchaseDto } from '../dto/create-purchase.dto';
import { formatDateYYYYMMDD } from '../../../utils/format-date';
import { CreatePurchaseItemDto } from '../dto/create-purchase-item.dto';
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

@Injectable()
export class PurchaseService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
    private readonly queryService: BasicQueryService,
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
}
