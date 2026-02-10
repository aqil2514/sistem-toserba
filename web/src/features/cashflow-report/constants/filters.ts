import { FilterSelectOptions } from "@/components/filters/filter-select";

export const statusCashflowFilterOptions: FilterSelectOptions[] = [
  {
    label: "Pengeluaran",
    value: "expense",
  },
  {
    label: "Pemasukan",
    value: "income",
  },
  {
    label: "Transfer Keluar",
    value: "transfer_out",
  },
  {
    label: "Transfer Masuk",
    value: "transfer_in",
  },
  {
    label: "Biaya Transfer",
    value: "transfer_fee",
  },
  {
    label: "Utang",
    value: "payable",
  },
  {
    label: "Piutang",
    value: "receivable",
  },
];
