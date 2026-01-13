import { FilterKeyType } from "@/components/molecules/filters/multi-filter";
import { SalesReportQuery } from "../types/query.report-sales";

export function getFilterKey(query: SalesReportQuery): FilterKeyType[] {
  if (query.mode === "summary-product")
    return [
      {
        filterKey: "product_id.name",
        label: "Nama Produk",
      },
      {
        filterKey: "product_id.category",
        label: "Kategori Produk",
      },
      {
        filterKey: "product_id.subcategory",
        label: "Subkategori Produk",
      },
    ];
  return [
    {
      filterKey: "sales_id.customer_name",
      label: "Pembeli",
    },
    {
      filterKey: "sales_id.payment_method",
      label: "Metode Pembayaran",
    },
    {
      filterKey: "product_id.name",
      label: "Produk",
    },
    {
      filterKey: "product_id.category",
      label: "Kategori Produk",
    },
    {
      filterKey: "product_id.subcategory",
      label: "Subkategori Produk",
    },
  ];
}
