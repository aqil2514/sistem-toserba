import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ActivityService } from '../../activity/activity.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { SalesItemDb } from '../interface/sales-items.interface';
import { SalesLogDetailRpc } from '../interface/sales-log.interface';
import { formatRupiah } from '../../../utils/format-to-rupiah';

@Injectable()
export class SalesLogService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
    private readonly activityService: ActivityService,
  ) {}

  private async getSalesById(salesId: string): Promise<SalesLogDetailRpc[]> {
    const { error, data } = await this.supabase.rpc('get_log_sales_detail', {
      p_sales_id: salesId,
    });

    if (error) {
      console.error(error);
      throw error;
    }

    if (!data) throw new NotFoundException('Data tidak ditemukan');

    return data;
  }

  private buildProductNaration(salesData: SalesLogDetailRpc[]) {
    if (!salesData || salesData.length === 0) return '';

    const products = salesData.map(
      (item) => `${item.product_name} (${item.quantity} pcs)`,
    );

    if (products.length === 1) return products[0];
    if (products.length === 2) return products.join(' dan');

    return (
      products.slice(0, -1).join(', ') +
      ', dan ' +
      products[products.length - 1]
    );
  }

  async createSalesLog(salesId: string) {
    const salesData = await this.getSalesById(salesId);
    if (!salesData || salesData.length === 0) return;

    const customerName = salesData[0].customer_name;
    const totalAmount = salesData[0].total_amount;
    const productNaration = this.buildProductNaration(salesData);

    this.activityService.createActivity({
      action: 'ADD_SALES',
      type: 'sales',
      reference_id: salesId,
      title: 'Penjualan Baru',
      description: `${customerName} baru saja membeli ${productNaration} dengan total harga ${formatRupiah(totalAmount)}`,
    });
  }

  async deleteSalesLog(salesId: string) {
    const salesData = await this.getSalesById(salesId);
    if (!salesData || salesData.length === 0) return;

    const customerName = salesData[0].customer_name;
    const totalAmount = salesData[0].total_amount;
    const productNaration = this.buildProductNaration(salesData);

    await this.activityService.createActivity({
      action: 'DELETE_SALES',
      description: `Data penjualan ${customerName} yang berisi ${productNaration} dengan total harga ${totalAmount} telah dihapus`,
      reference_id: salesId,
      title: 'Hapus Data Penjualan',
      type: 'sales',
    });
  }

  async editSalesLog(salesId: string) {
    const salesData = await this.getSalesById(salesId);
    if (!salesData || salesData.length === 0) return;

    const customerName = salesData[0].customer_name;
    const totalAmount = salesData[0].total_amount;
    const productNaration = this.buildProductNaration(salesData);

    await this.activityService.createActivity({
      title: 'Edit Data Penjualan',
      action: 'EDIT_SALES',
      reference_id: salesId,
      description: `Data penjualan ${customerName} berubah menjadi ${productNaration} dan total harga menjadi ${formatRupiah(totalAmount)}`,
      type: 'sales',
    });
  }
}
