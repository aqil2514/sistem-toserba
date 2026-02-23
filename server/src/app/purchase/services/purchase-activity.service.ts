import { Injectable } from '@nestjs/common';
import { ActivityService } from '../../activity/activity.service';
import { PurchaseItemInsert } from '../interface/items/purchase-items.interface';
import { PurchaseInsert } from '../interface/purchase.interface';
import { formatRupiah } from '../../../utils/format-to-rupiah';
import {
  PurchaseDetailMeta,
  PurchaseEditMeta,
} from '../../activity/types/per-feature/purchase-activity';

@Injectable()
export class PurchaseActivityService {
  constructor(private readonly activityService: ActivityService) {}

  private buildProductNaration(salesData: PurchaseItemInsert[]) {
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

  private buildPurchaseDetailMeta(
    purchase: PurchaseInsert,
    items: PurchaseItemInsert[],
    reference_id: string,
  ): PurchaseDetailMeta {
    const mappedItem: PurchaseDetailMeta['items'] = items.map((item) => ({
      hpp: item.hpp,
      price: item.price,
      product_name: item.product_name,
      quantity: item.quantity,
    }));

    return {
      id: reference_id,
      items: mappedItem,
      notes: purchase.notes,
      purchase_date: purchase.purchase_date,
      supplier_name: purchase.supplier_name,
    };
  }

  private buildPurchaseEditMeta(
    newPurchase: PurchaseInsert,
    oldPurchase: PurchaseInsert,
    newItems: PurchaseItemInsert[],
    oldItems: PurchaseItemInsert[],
    reference_id: string,
  ): PurchaseEditMeta {
    const newPurchaseMeta = this.buildPurchaseDetailMeta(
      newPurchase,
      newItems,
      reference_id,
    );
    const oldPurchaseMeta = this.buildPurchaseDetailMeta(
      oldPurchase,
      oldItems,
      reference_id,
    );
    return {
      id: reference_id,
      new: newPurchaseMeta,
      old: oldPurchaseMeta,
    };
  }

  async createPurchaseActivity(
    purchase: PurchaseInsert,
    items: PurchaseItemInsert[],
    reference_id: string,
  ) {
    const productNaration = this.buildProductNaration(items);
    const totalPrice = items.reduce((acc, curr) => acc + curr.price, 0);
    const meta = this.buildPurchaseDetailMeta(purchase, items, reference_id);

    await this.activityService.createActivity({
      action: 'ADD_PURCHASE',
      type: 'purchase',
      title: 'Tambah Data Pembelian Stok',
      description: `Kamu baru saja membeli ${productNaration} dari ${purchase.supplier_name} dengan total pembelian ${formatRupiah(totalPrice)}`,
      reference_id,
      meta,
    });
  }

  async deletePurchaseActivity(
    purchase: PurchaseInsert,
    items: PurchaseItemInsert[],
    reference_id: string,
  ) {
    const productNaration = this.buildProductNaration(items);
    const totalPrice = items.reduce((acc, curr) => acc + curr.price, 0);
    const meta = this.buildPurchaseDetailMeta(purchase, items, reference_id);

    await this.activityService.createActivity({
      action: 'DELETE_PURCHASE',
      type: 'purchase',
      title: 'Menghapus Data Pembelian Stok',
      description: `Data Pembelian ${productNaration} dari ${purchase.supplier_name} dengan total pembelian ${formatRupiah(totalPrice)} telah dihapus`,
      reference_id,
      meta,
    });
  }

  async updatePurchaseActivity(
    newPurchase: PurchaseInsert,
    oldPurchase: PurchaseInsert,
    newItems: PurchaseItemInsert[],
    oldItems: PurchaseItemInsert[],
    reference_id: string,
  ) {
    const productNaration = this.buildProductNaration(oldItems);
    const totalPrice = newItems.reduce((acc, curr) => acc + curr.price, 0);
    const meta = this.buildPurchaseEditMeta(
      newPurchase,
      oldPurchase,
      newItems,
      oldItems,
      reference_id,
    );

    await this.activityService.createActivity({
      action: 'EDIT_PURCHASE',
      type: 'purchase',
      title: 'Update Data Pembelian Stok',
      description: `Data Pembelian ${productNaration} dari ${oldPurchase.supplier_name} dengan total pembelian ${formatRupiah(totalPrice)} telah di-update`,
      reference_id,
      meta,
    });
  }
}
