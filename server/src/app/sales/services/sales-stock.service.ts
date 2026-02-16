import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

interface SalesItemInfo {
  product_id: string;
  quantity: number;
}

@Injectable()
export class SalesStockService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async consumeStock(product_id: string, quantity: number): Promise<void> {
    const { data: batches, error } = await this.supabase
      .from('purchase_items')
      .select('*')
      .eq('product_id', product_id)
      .gt('remaining_quantity', 0)
      .order('created_at', { ascending: true });

    if (error) throw error;
    if (!batches || batches.length === 0)
      throw new BadRequestException('Stok sudah habis');

    let remainingToConsume = quantity;

    for (const batch of batches) {
      if (remainingToConsume <= 0) break;

      const consume = Math.min(batch.remaining_quantity, remainingToConsume);
      remainingToConsume -= consume;

      await this.supabase
        .from('purchase_items')
        .update({
          remaining_quantity: batch.remaining_quantity - consume,
        })
        .eq('id', batch.id);
    }

    if (remainingToConsume > 0)
      throw new BadRequestException('Stok tidak mencukupi');
  }

  async restoreStockFromSalesItems(items: SalesItemInfo[]): Promise<void> {
    for (const item of items) {
      // Ambil batch yang masih ada / habis sesuai FIFO (reverse order bisa dipakai)
      let remainingToRestore = item.quantity;

      const { data: batches, error } = await this.supabase
        .from('purchase_items')
        .select('*')
        .eq('product_id', item.product_id)
        .order('created_at', { ascending: false }); // mulai dari batch terbaru agar sesuai FIFO

      if (error) throw error;

      for (const batch of batches) {
        if (remainingToRestore <= 0) break;

        // Hitung berapa jumlah yang bisa dikembalikan ke batch
        const originalBatchCapacity = batch.quantity; // total batch awal
        const availableToRestore =
          originalBatchCapacity - batch.remaining_quantity;
        const restoreQty = Math.min(availableToRestore, remainingToRestore);

        if (restoreQty <= 0) continue;

        remainingToRestore -= restoreQty;

        await this.supabase
          .from('purchase_items')
          .update({
            remaining_quantity: batch.remaining_quantity + restoreQty,
          })
          .eq('id', batch.id);
      }

      if (remainingToRestore > 0) {
        console.warn(
          `Warning: ada ${remainingToRestore} unit yang tidak bisa dikembalikan karena batch sudah penuh`,
        );
      }
    }
  }
}
