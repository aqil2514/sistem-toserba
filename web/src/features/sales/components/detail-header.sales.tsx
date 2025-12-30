import { InfoItem } from "@/components/ui/info-item";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils/format-date.fns";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { SalesHeader } from "../types/sales-header";

interface Props {
  salesHeader: SalesHeader;
}

export function SalesDetailHeader({ salesHeader }: Props) {
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
      <InfoItem label="Catatan" value={salesHeader.notes} />
    </div>
  );
}
