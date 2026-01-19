import { SalesReportProductRpcReturn } from '../../../../../../app/sales/interface/sales-report.interface';
import { SalesItemApiResponse } from '../../../../../../app/sales/interface/sales-items.interface';
import { formatRupiah } from '../../../../../../utils/format-to-rupiah';

export function buildFullDetailTableData(
  data: SalesItemApiResponse[],
): string[][] {
  // Map key = customer + product
  const map = new Map<string, { quantity: number; subtotal: number }>();

  data.forEach(item => {
    const customer = item.sales_id?.customer_name ?? '-';
    const product = item.product_id?.name ?? '-';
    const key = `${customer}||${product}`;

    const quantity = item.quantity ?? 0;
    const subtotal = item.subtotal ?? 0;

    if (map.has(key)) {
      // tambah quantity & subtotal jika sudah ada
      const existing = map.get(key)!;
      map.set(key, {
        quantity: existing.quantity + quantity,
        subtotal: existing.subtotal + subtotal,
      });
    } else {
      map.set(key, { quantity, subtotal });
    }
  });

  // Convert map ke array
  const result: string[][] = [];
  map.forEach((value, key) => {
    const [customer, product] = key.split('||');
    result.push([
      customer,
      product,
      value.quantity.toString(),
      formatRupiah(value.subtotal),
    ]);
  });

  return result;
}

export function buildProductSummaryTableData(
  data: SalesReportProductRpcReturn[],
): string[][] {
    const sorted = data
    .slice()
    .sort((a, b) => {
      const aTotal = (a.subtotal ?? 0) + (a.tip ?? 0) - (a.discount ?? 0);
      const bTotal = (b.subtotal ?? 0) + (b.tip ?? 0) - (b.discount ?? 0);
      return bTotal - aTotal;
    });

  const top10 = sorted.slice(0, 10);

  return top10.map((item) => [
    item.product_name,
    item.category,
    item.quantity.toString(),
    formatRupiah(item.subtotal + item.tip - item.discount ),
  ]);
}
