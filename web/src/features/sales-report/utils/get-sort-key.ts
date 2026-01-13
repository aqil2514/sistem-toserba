import { SortingKeyType } from "@/components/molecules/sorting/single-sorting";
import { SalesReportQuery } from "../types/query.report-sales";

export function getSortKey(query: SalesReportQuery): SortingKeyType[] {
  if (query.mode === "summary-product")
    return [
      {
        sortingKey: "product_name",
        label: "Nama Produk",
      },
      {
        sortingKey: "product_category",
        label: "Kategori Produk",
      },
      {
        sortingKey: "product_subcategory",
        label: "Subkategori Produk",
      },
      {
        sortingKey: "quantity",
        label: "Kuantiti",
      },
      {
        sortingKey: "hpp",
        label: "Total HPP",
      },
      {
        sortingKey: "margin",
        label: "Total Margin",
      },
      {
        sortingKey: "subtotal",
        label: "Total Belanja",
      },
      {
        sortingKey: "tip",
        label: "Total Tip",
      },
      {
        sortingKey: "markup_percent",
        label: "Total Markup %",
      },
      {
        sortingKey: "margin_percent",
        label: "Total Margin %",
      },
    ];
  return [
    {
      sortingKey: "sales_id.customer_name",
      label: "Pembeli",
    },
    {
      sortingKey: "sales_id.payment_method",
      label: "Metode Pembayaran",
    },
    {
      sortingKey: "product_id.name",
      label: "Produk",
    },
    {
      sortingKey: "product_id.category",
      label: "Kategori Produk",
    },
    {
      sortingKey: "product_id.subcategory",
      label: "Subkategori Produk",
    },
  ];
}
