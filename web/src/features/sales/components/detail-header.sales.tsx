import { InfoItem } from "@/components/ui/info-item";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils/format-date.fns";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { SalesHeader } from "../types/sales-header";
import { calculateProfit } from "../utils/calculate-profit";
import { formatPercent } from "@/utils/format-percent";

interface Props {
  salesHeader: SalesHeader;
  totalHpp: number;
}

export function SalesDetailHeader({ salesHeader, totalHpp }: Props) {
  const { margin, marginPercent, markupPercent } = calculateProfit(
    salesHeader.total_amount,
    totalHpp
  );
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg text-center text-gray-500">
        Informasi Pembelian
      </h3>
      <Separator />
      <InfoItem label="Kode Penjualan" value={salesHeader.sales_code} />
      <div className="grid md:grid-cols-2 gap-4">
        <InfoItem label="Nama Pembeli" value={salesHeader.customer_name} />
        <InfoItem
          label="Waktu Pembelian"
          value={formatDate(
            salesHeader.transaction_at,
            "Senin, 29 Desember 2025, 09:21"
          )}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <InfoItem
          label="Total Belanja"
          value={formatRupiah(salesHeader.total_amount)}
        />
        <InfoItem
          label="Metode Pembayaran"
          value={salesHeader.payment_method}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <InfoItem label="Total HPP" value={formatRupiah(totalHpp, 2)} />
        <InfoItem label="Total Margin" value={formatRupiah(margin, 2)} />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <InfoItem
          label="Total Margin %"
          value={formatPercent(marginPercent, { maximumFractionDigits: 2 })}
        />
        <InfoItem
          label="Total Markdown %"
          value={formatPercent(markupPercent, { maximumFractionDigits: 2 })}
        />
      </div>
      <InfoItem label="Catatan" value={salesHeader.notes} />
    </div>
  );
}
