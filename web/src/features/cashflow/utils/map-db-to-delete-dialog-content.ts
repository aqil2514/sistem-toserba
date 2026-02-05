import { LabelValue } from "@/@types/general";
import { CashflowDb } from "../types/cashflow.types";
import { formatDate } from "@/utils/format-date.fns";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { extractTransferCashflow } from "./extract-transfer-cashflow";

export function mapDbToDeleteDialogContent(raw: CashflowDb[]): LabelValue[] {
  const isTransfer = Boolean(raw[0].transfer_group_id);

  return isTransfer ? transferCashflow(raw) : nonTransferCashflow(raw[0]);
}

const nonTransferCashflow = (raw: CashflowDb): LabelValue[] => [
  {
    label: "Tanggal Transaksi",
    value: formatDate(raw.transaction_at, "Senin, 29 Desember 2025"),
  },
  {
    label: "Nama Produk / Jasa",
    value: raw.product_service,
  },
  {
    label: "Kategori",
    value: raw.category.name,
  },
  {
    label: "Status Cashflow",
    value: raw.status_cashflow,
  },
  {
    label: "Dari Aset",
    value: raw.via,
  },
  {
    label: "Nominal",
    value: formatRupiah(raw.price),
  },
];

const transferCashflow = (raw: CashflowDb[]): LabelValue[] => {
  const { expense, fee, income } = extractTransferCashflow(raw);

  return [
    {
      label: "Tanggal Transaksi",
      value: formatDate(expense.transaction_at, "Senin, 29 Desember 2025"),
    },
    {
      label: "Nama Produk / Jasa",
      value: expense.product_service,
    },
    {
      label: "Kategori",
      value: expense.category.name,
    },
    {
      label: "Status Cashflow",
      value: "Transfer",
    },
    {
      label: "Aset yang Terlibat",
      value: `${expense.via} => ${income.via}`,
    },
    {
      label: "Nominal",
      value: formatRupiah(expense.price),
    },
    {
      label: "Biaya Transfer",
      value: fee ? formatRupiah(fee.price) : "-",
    },
  ];
};
