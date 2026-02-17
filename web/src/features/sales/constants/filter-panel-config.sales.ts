import { FilterConfig } from "@/components/filters/filter-panel/types.filter-panel";

export const salesFilterPanelConfig: FilterConfig[] = [
  {
    field: "sales_code",
    label: "Kode Pembelian",
    type: "text",
    withOperator: true,
  },
  {
    field: "customer_name",
    label: "Nama Pembeli",
    type: "text",
    withOperator: true,
  },
  {
    field: "total_amount",
    label: "Total Pembelian",
    type: "text",
    withOperator: true,
  },
  {
    field: "payment_method",
    label: "Metode Pembayaran",
    type: "select",
    selectOptions: [
      {
        label: "Kas (Lunas)",
        value: "cash",
      },
      {
        label: "Utang",
        value: "utang",
      },
      {
        label: "Digital",
        value: "digital",
      },
    ],
  },
];
