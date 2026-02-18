import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ActivityService } from '../../activity/activity.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { SalesItemDb } from '../interface/sales-items.interface';
import {
  SalesLogDetailRpc,
  SalesLogMetaDetail,
  SalesLogMetaEdit,
} from '../interface/sales-log.interface';
import { formatRupiah } from '../../../utils/format-to-rupiah';

@Injectable()
export class SalesLogService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
    private readonly activityService: ActivityService,
  ) {}
  
  async getSalesForLogById(salesId: string): Promise<SalesLogDetailRpc[]> {
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
    if (products.length === 2) return products.join(' dan ');

    return (
      products.slice(0, -1).join(', ') +
      ', dan ' +
      products[products.length - 1]
    );
  }

  private createSalesLogMeta(
    salesData: SalesLogDetailRpc[],
    salesId: string,
  ): SalesLogMetaDetail {
    if (!salesData || salesData.length === 0) return;

    const customerName = salesData[0].customer_name;
    const totalAmount = salesData[0].total_amount;

    const products: SalesLogMetaDetail['products'] = salesData.map((item) => ({
      product_name: item.product_name,
      quantity: item.quantity,
    }));

    return {
      customer_name: customerName,
      total_amount: totalAmount,
      sales_id: salesId,
      products,
    };
  }

  async createSalesLog(salesId: string) {
    const salesData = await this.getSalesForLogById(salesId);
    if (!salesData || salesData.length === 0) return;

    const customerName = salesData[0].customer_name;
    const totalAmount = salesData[0].total_amount;
    const productNaration = this.buildProductNaration(salesData);
    const meta = this.createSalesLogMeta(salesData, salesId);

    this.activityService.createActivity({
      action: 'ADD_SALES',
      type: 'sales',
      reference_id: salesId,
      title: 'Penjualan Baru',
      description: `${customerName} baru saja membeli ${productNaration} dengan total harga ${formatRupiah(totalAmount)}`,
      meta,
    });
  }

  async deleteSalesLog(salesId: string) {
    const salesData = await this.getSalesForLogById(salesId);
    if (!salesData || salesData.length === 0) return;

    const customerName = salesData[0].customer_name;
    const totalAmount = salesData[0].total_amount;
    const productNaration = this.buildProductNaration(salesData);

    const meta = this.createSalesLogMeta(salesData, salesId);

    await this.activityService.createActivity({
      action: 'DELETE_SALES',
      description: `Data penjualan ${customerName} yang berisi ${productNaration} dengan total harga ${totalAmount} telah dihapus`,
      reference_id: salesId,
      title: 'Hapus Data Penjualan',
      type: 'sales',
      meta,
    });
  }

  private editSalesLogMeta(
    newData: SalesLogDetailRpc[],
    oldData: SalesLogDetailRpc[],
    salesId: string,
  ): SalesLogMetaEdit {
    if (!newData || newData.length === 0 || !oldData || oldData.length === 0)
      return;

    const newCustomerName = newData[0].customer_name;
    const newTotalAmount = newData[0].total_amount;
    const newProducts: SalesLogMetaDetail['products'] = newData.map((item) => ({
      product_name: item.product_name,
      quantity: item.quantity,
    }));

    const oldCustomerName = oldData[0].customer_name;
    const oldTotalAmount = oldData[0].total_amount;
    const oldProducts: SalesLogMetaDetail['products'] = oldData.map((item) => ({
      product_name: item.product_name,
      quantity: item.quantity,
    }));

    return {
      sales_id: salesId,
      customer_name: {
        new: newCustomerName,
        old: oldCustomerName,
      },
      total_amount: {
        old: oldTotalAmount,
        new: newTotalAmount,
      },
      products: {
        new: newProducts,
        old: oldProducts,
      },
    };
  }

  async editSalesLog(salesId: string, oldData: SalesLogDetailRpc[]) {
    const salesData = await this.getSalesForLogById(salesId);
    if (!salesData || salesData.length === 0) return;

    const customerName = salesData[0].customer_name;
    const totalAmount = salesData[0].total_amount;
    const productNaration = this.buildProductNaration(salesData);
    const meta = this.editSalesLogMeta(salesData, oldData, salesId);

    await this.activityService.createActivity({
      title: 'Edit Data Penjualan',
      action: 'EDIT_SALES',
      reference_id: salesId,
      description: `Data penjualan ${customerName} berubah menjadi ${productNaration} dan total harga menjadi ${formatRupiah(totalAmount)}`,
      type: 'sales',
      meta
    });
  }
}
