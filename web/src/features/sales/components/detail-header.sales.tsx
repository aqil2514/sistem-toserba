import { InfoItem } from "@/components/ui/info-item";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils/format-date.fns";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { SalesHeader } from "../types/sales-header";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useClipboard } from "@/hooks/use-clipboard";

interface Props {
  salesHeader: SalesHeader;
}

export function SalesDetailHeader({ salesHeader }: Props) {
  const { copy } = useClipboard();
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg text-center text-gray-500">
        Informasi Pembelian
      </h3>
      <Separator />
      <div className="flex gap-4 items-center">
        <InfoItem label="Kode Penjualan" value={salesHeader.sales_code} />
        <Button
          size={"icon-sm"}
          variant={"ghost"}
          onClick={() =>
            copy(salesHeader.id, {
              successMessage: "ID Transaksi berhasil disalin",
            })
          }
        >
          <Copy />
        </Button>
      </div>
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
