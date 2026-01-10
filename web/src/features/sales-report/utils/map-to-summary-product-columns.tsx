import { SalesItemApiResponse } from "@/features/sales/types/sales-item-api";
import { SalesReportProductSummaryColumn } from "../types/summary-columns.report-sales";

export function mapToSummaryColumns(
  raw: SalesItemApiResponse[]
): SalesReportProductSummaryColumn[] {
  const summaryMap = new Map<string, SalesReportProductSummaryColumn>();

  for (const r of raw) {
    const key = r.product_id.id;
    const existData = summaryMap.get(key);

    if (!existData) {
      summaryMap.set(key, {
        product_id: r.product_id.id,
        product_name: r.product_id.name,
        quantity: r.quantity,
        total_amount: r.subtotal,
        total_tip: r.tip,
        total_hpp: r.hpp,
        total_margin: r.margin,
        total_discount: r.discount,
        margin_percent: r.hpp
          ? (r.subtotal - r.hpp) / r.subtotal
          : 0,
        markup_percent: r.hpp
          ? (r.subtotal - r.hpp) / r.hpp
          : 0,
      });
      continue;
    }

    const totalAmount = existData.total_amount + r.subtotal;
    const totalHpp = existData.total_hpp + r.hpp;

    summaryMap.set(key, {
      ...existData,
      quantity: existData.quantity + r.quantity,
      total_amount: totalAmount,
      total_tip: existData.total_tip + r.tip,
      total_hpp: totalHpp,
      total_margin: existData.total_margin + r.margin,
      total_discount: existData.total_discount + r.discount,
      margin_percent: totalAmount
        ? (totalAmount - totalHpp) / totalAmount
        : 0,
      markup_percent: totalHpp
        ? (totalAmount - totalHpp) / totalHpp
        : 0,
    });
  }

  return Array.from(summaryMap.values());
}