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

  async createSalesLog(salesId: string) {
    const salesData = await this.getSalesById(salesId);
    if (!salesData || salesData.length === 0) return;

    const customerName = salesData[0].customer_name;
    const totalAmount = salesData[0].total_amount;
    const buildProductNaration = () => {
      if (!salesData || salesData.length === 0) return '';

      const formatted = salesData.map(
        (item) => `${item.product_name} ${item.quantity} pcs`,
      );

      if (formatted.length === 1) return formatted[0];

      if (formatted.length === 2) return formatted.join(' dan ');

      return (
        formatted.slice(0, -1).join(', ') +
        ', dan ' +
        formatted[formatted.length - 1]
      );
    };

    const productNaration = buildProductNaration();

    this.activityService.createActivity({
      action: 'ADD_SALES',
      type: 'sales',
      reference_id: salesId,
      title: 'Penjualan Baru',
      description: `${customerName} baru saja membeli ${productNaration} dengan total harga ${formatRupiah(totalAmount)}`,
    });
  }
}
