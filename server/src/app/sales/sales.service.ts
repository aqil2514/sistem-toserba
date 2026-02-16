import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SalesQuery } from './interface/sales-query.interface';
import {
  applyDateRangeFilter,
  applyPagination,
} from '../../utils/query-builder';
import {
  SalesItemApiResponse,
  SalesItemDb,
  SalesItemInsert,
} from './interface/sales-items.interface';
import { CreateSalesDto } from './dto/create-sales.dto';
import { SalesItemDto } from './dto/sales-item.dto';
import { SalesDb, SalesDbInsert } from './interface/sales.interface';
import { formatDateYYYYMMDD } from '../../utils/format-date';
import { SalesStockService } from './services/sales-stock.service';
import { DateTime } from 'luxon';
import { DataQueryResponse } from '../../@types/general';
import { ActivityService } from '../activity/activity.service';
import { ActivityLogsInsert } from '../activity/types/activity.types';
import { SalesLogService } from './services/sales-log.service';

@Injectable()
export class SalesService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
    private readonly salesStockService: SalesStockService,
    private readonly activityService: ActivityService,
    private readonly salesLog: SalesLogService,
  ) {}

  private async generateSalesCode(date: Date): Promise<string> {
    const dateStr = formatDateYYYYMMDD(date);
    const prefix = `TRX-${dateStr}-`;

    const { data } = await this.supabase
      .from('sales')
      .select('sales_code')
      .ilike('sales_code', `${prefix}%`)
      .order('sales_code', { ascending: false })
      .limit(1)
      .maybeSingle();

    let nextNumber = 1;

    if (data?.sales_code) {
      const lastNumber = Number(data.sales_code.split('-').pop());
      nextNumber = lastNumber + 1;
    }

    return `${prefix}${String(nextNumber).padStart(4, '0')}`;
  }

  private async mapToDbSalesItem(
    raw: SalesItemDto,
    transaction_id: string,
    transaction_date: string,
  ): Promise<SalesItemInsert> {
    const { data: batches, error } = await this.supabase
      .from('purchase_items')
      .select('*')
      .eq('product_id', raw.product_id)
      .gt('remaining_quantity', 0)
      .order('created_at', { ascending: true });

    if (error) {
      console.error(error);
      throw error;
    }

    if (!batches || batches.length === 0)
      throw new BadRequestException('Stok sudah habis');

    let remainingToSell = raw.quantity;
    let totalHpp = 0;

    for (const batch of batches) {
      if (remainingToSell <= 0) break;

      const consume = Math.min(batch.remaining_quantity, remainingToSell);

      remainingToSell -= consume;
      totalHpp += consume * batch.hpp;
    }

    if (remainingToSell > 0)
      throw new BadRequestException('Stok tidak mencukupi');

    return {
      discount: raw.discount,
      hpp: totalHpp,
      margin: raw.quantity * raw.price - totalHpp,
      product_id: raw.product_id,
      quantity: raw.quantity,
      sales_id: transaction_id,
      subtotal: raw.quantity * raw.price,
      tip: raw.tip,
      transaction_date: transaction_date,
    };
  }

  private async mapToDbSales(
    raw: CreateSalesDto,
    exist_sales_code?: string,
  ): Promise<SalesDbInsert> {
    const dt = DateTime.fromISO(raw.transaction_at, {
      zone: 'Asia/Jakarta',
    });

    if (!dt.isValid) {
      throw new Error('Invalid transaction_at format');
    }

    const utcDate = dt.toUTC().toJSDate();

    const sales_code =
      exist_sales_code ?? (await this.generateSalesCode(utcDate));

    return {
      customer_name: raw.customer_name,
      notes: raw.notes,
      payment_method: raw.payment_method,
      total_amount: raw.total_amount,
      transaction_at: utcDate, // ✅ Date
      sales_code,
    };
  }

  private async createNewSales(raw: CreateSalesDto) {
    const salesPayload = await this.mapToDbSales(raw);
    const { data, error } = await this.supabase
      .from('sales')
      .insert(salesPayload)
      .select('id, transaction_at')
      .single();

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  private async updateSales(transaction_id: string, raw: CreateSalesDto) {
    const { data: old } = await this.supabase
      .from('sales')
      .select('sales_code')
      .eq('id', transaction_id)
      .maybeSingle();

    if (!old) throw new NotFoundException('Data penjualan tidak ditemukan');
    const salesPayload = await this.mapToDbSales(raw, old.sales_code);

    const { data, error } = await this.supabase
      .from('sales')
      .update(salesPayload)
      .eq('id', transaction_id)
      .select('id, transaction_at')
      .single();

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  private async createNewSalesItem(
    raw: CreateSalesDto,
    transaction: { id: string; transaction_at: string },
  ): Promise<SalesItemDb[]> {
    const dbItems = await Promise.all(
      raw.items.map((item) =>
        this.mapToDbSalesItem(item, transaction.id, transaction.transaction_at),
      ),
    );

    const { data, error } = await this.supabase
      .from('sales_items')
      .insert(dbItems)
      .select('*');

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  async createNewTransaction(raw: CreateSalesDto) {
    // 1️⃣ Buat header sales
    const sales = await this.createNewSales(raw);

    let salesItemIds: string[] = [];
    let product_ids: string[] = [];

    try {
      // 2️⃣ Mapping DTO → DB entity + hitung HPP
      const salesItems = await this.createNewSalesItem(raw, sales);

      salesItemIds = salesItems.map((item) => item.id);
      product_ids = salesItems.map((item) => item.product_id);

      // 3️⃣ Kurangi stok batch-by-batch (consumeStock)
      for (const item of raw.items) {
        await this.salesStockService.consumeStock(
          item.product_id,
          item.quantity,
        );
      }

      // 4️⃣ Insert sales items ke DB
      Promise.all([
        await this.supabase.from('sales_items').insert(salesItems),
        await this.salesLog.createSalesLog(sales.id),
      ]);
    } catch (error) {
      // rollback sales header jika gagal
      await this.supabase.from('sales').delete().eq('id', sales.id);
      throw error;
    }

    return {
      salesId: sales.id,
      salesItemIds,
      product_ids,
    };
  }

  async deleteTransaction(transaction_id: string) {
    // 1️⃣ Ambil semua sales_items dari transaksi
    const { data: salesItems, error } = await this.supabase
      .from('sales_items')
      .select('product_id, quantity')
      .eq('sales_id', transaction_id);

    if (error) throw error;

    // 2️⃣ Restore stok
    await this.salesStockService.restoreStockFromSalesItems(salesItems);

    // 3️⃣ Hapus sales_items dan header sales
    await this.salesLog.deleteSalesLog(transaction_id);
    await this.supabase
      .from('sales_items')
      .delete()
      .eq('sales_id', transaction_id);
    await this.supabase.from('sales').delete().eq('id', transaction_id);
  }

  async updateTransaction(transaction_id: string, raw: CreateSalesDto) {
    await this.updateSales(transaction_id, raw);
    // 1️⃣ Ambil sales_items lama
    const { data: oldItems } = await this.supabase
      .from('sales_items')
      .select('product_id, quantity')
      .eq('sales_id', transaction_id);

    // 2️⃣ Restore stok
    await this.salesStockService.restoreStockFromSalesItems(oldItems);

    // 3️⃣ Hapus sales_items lama
    await this.supabase
      .from('sales_items')
      .delete()
      .eq('sales_id', transaction_id);

    // 4️⃣ Hitung HPP & mapping sales_items baru
    const { data: oldTransaction } = await this.supabase
      .from('sales')
      .select('transaction_at')
      .eq('id', transaction_id)
      .single();

    const newSalesItems = await this.createNewSalesItem(raw, {
      id: transaction_id,
      transaction_at: oldTransaction.transaction_at,
    });

    // 5️⃣ Consume stok batch baru
    for (const item of raw.items) {
      await this.salesStockService.consumeStock(item.product_id, item.quantity);
    }

    // 6️⃣ Insert sales_items baru
    await this.supabase.from('sales_items').insert(newSalesItems);
    await this.salesLog.editSalesLog(transaction_id)

    return newSalesItems;
  }
}
