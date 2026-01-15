import { FilterKeyType } from "@/components/molecules/filters/multi-filter";
import { SalesReportQuery } from "../types/query.report-sales";

export function getFilterKey(query: SalesReportQuery): FilterKeyType[] {
  if (query.content === "summary") return getSummaryContentFilterKey();

  if (query.mode === "summary-product")
    return getDetailContentSummaryProductModeFilterKey();

  return getDetailContentFullModeFilterKey();
}

const getSummaryContentFilterKey = (): FilterKeyType[] => {
  return [
    {
      filterKey: "p_buyer",
      label: "Nama Pembeli",
    },
    {
      filterKey: "p_product_name",
      label: "Nama Produk",
    },
    {
      filterKey: "p_payment_method",
      label: "Metode Pembayaran",
    },
    {
      filterKey: "p_product_category",
      label: "Kategori Produk",
    },
    {
      filterKey: "p_product_subcategory",
      label: "Subkategori Produk",
    },
  ];
};

const getDetailContentSummaryProductModeFilterKey = (): FilterKeyType[] => {
  return [
    {
      filterKey: "p_product_name",
      label: "Nama Produk",
    },
    {
      filterKey: "p_product_category",
      label: "Kategori Produk",
    },
    {
      filterKey: "p_product_subcategory",
      label: "Subkategori Produk",
    },
  ];
};

const getDetailContentFullModeFilterKey = () => {
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
};
