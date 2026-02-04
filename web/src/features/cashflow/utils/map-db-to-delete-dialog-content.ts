import { LabelValue } from "@/@types/general";
import { CashflowDb } from "../types/cashflow.types";
import { formatDate } from "@/utils/format-date.fns";
import { formatRupiah } from "@/utils/format-to-rupiah";

const transfer_fee_category_id = "d8d34dd6-4010-4e96-a081-288821917620";

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
  const expense = raw.find((v) => v.status_cashflow === "expense");
  const income = raw.find((v) => v.status_cashflow === "income");
  const fee = raw.find(
    (v) =>
      v.status_cashflow === "expense" &&
      v.category.id === transfer_fee_category_id,
  );

  if (!expense || !income) {
    throw new Error("Invalid transfer cashflow data");
  }

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
    value: fee ? formatRupiah(fee.price) : "-" ,
  },
];
};
