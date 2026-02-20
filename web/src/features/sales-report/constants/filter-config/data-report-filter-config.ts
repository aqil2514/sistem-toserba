import { FilterConfig } from "@/components/filters/filter-panel/types.filter-panel";

export const filterConfigDataReportDetail: FilterConfig[] = [
  {
    field: "product_name",
    label: "Nama Produk",
    type: "text",
    withOperator: true,
  },
];

export const filterConfigDataReportFullMode: FilterConfig[] = [
  {
    field: "product_id.name",
    label: "Nama Produk",
    type: "text",
    withOperator: true,
  },
  {
    field: "sales_id.customer_name",
    label: "Nama Pembeli",
    type: "text",
    withOperator: true,
  },
];
