import React from "react";
import { CashflowDb, ReceivableCashflowMeta } from "../../types/cashflow.types";
import { OneLineItem } from "@/components/molecules/items/one-line-item";
import { formatDate } from "@/utils/format-date.fns";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { Separator } from "@/components/ui/separator";
import { extractTransferCashflow } from "../../utils/extract-transfer-cashflow";

interface Props {
  data: CashflowDb[];
}

export function CashflowDetailData({ data }: Props) {
  const isTransfer = data.length > 1;

  if (data.length === 0) return null;

  return isTransfer ? (
    <TransferDetail data={data} />
  ) : (
    <NonTransferDetail data={data} />
  );
}

const NonTransferDetail: React.FC<Props> = ({ data }) => {
  const cashflowData = data[0];
  const isReceivableData = cashflowData.status_cashflow === "receivable";

  return (
    <div className="space-y-4">
      <Separator />
      <OneLineItem
        label="Tanggal"
        value={formatDate(
          cashflowData.transaction_at,
          "Senin, 29 Desember 2025, 09:21",
        )}
      />
      <OneLineItem label="Total" value={formatRupiah(cashflowData.price)} />
      <OneLineItem label="Produk / Jasa" value={cashflowData.product_service} />
      {isReceivableData && (
        <OneLineItem
          label="Pihak yang berhutang"
          value={(cashflowData.meta as ReceivableCashflowMeta).customer_name}
        />
      )}
      <OneLineItem label="Kategori" value={cashflowData.category.name} />
      <OneLineItem
        label="Status Cashflow"
        value={
          cashflowData.status_cashflow === "expense"
            ? "Pengeluaran"
            : "Pemasukan"
        }
      />
      <OneLineItem label="Aset" value={cashflowData.via} />
      {cashflowData.note && (
        <OneLineItem label="Catatan" value={cashflowData.note} />
      )}
      <Separator />
    </div>
  );
};

const TransferDetail: React.FC<Props> = ({ data }) => {
  const { expense, fee, income } = extractTransferCashflow(data);
  return (
    <div className="space-y-4">
      <Separator />
      <OneLineItem
        label="Tanggal"
        value={formatDate(
          expense.transaction_at,
          "Senin, 29 Desember 2025, 09:21",
        )}
      />
      <OneLineItem label="Total" value={`${formatRupiah(expense.price)}`} />
      {fee && (
        <OneLineItem
          label="Biaya Transfer"
          value={`${formatRupiah(fee.price)}`}
        />
      )}
      <OneLineItem label="Produk / Jasa" value={expense.product_service} />
      <OneLineItem label="Kategori" value={expense.category.name} />
      <OneLineItem label="Status Cashflow" value={"Transfer"} />
      <OneLineItem label="Aset" value={`${expense.via} > ${income.via}`} />
      {expense.note && <OneLineItem label="Catatan" value={expense.note} />}
      <Separator />
    </div>
  );
};
