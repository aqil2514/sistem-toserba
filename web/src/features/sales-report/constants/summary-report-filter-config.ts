import { FilterConfig } from "@/components/filters/filter-panel/types.filter-panel";

export const summaryReportFilterConfig: FilterConfig[] = [
  {
    field: "s.customer_name",
    label: "Nama Pembeli",
    type: "text",
    withOperator: true,
  },
  {
    field: "p.name",
    label: "Nama Produk",
    type: "text",
    withOperator: true,
  },
];
