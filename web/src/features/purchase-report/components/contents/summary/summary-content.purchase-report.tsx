import { InfoItem } from "@/components/molecules/items/info-item";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { usePurchaseReport } from "@/features/purchase-report/store/provider.purchase-report";
import { formatRupiah } from "@/utils/format-to-rupiah";

export function PurchaseReportSummaryContent() {
  const { data, isLoading } = usePurchaseReport();

  if (isLoading || !data) return <LoadingSpinner label="Mengambil data...." />;

  if (data.mode === "summary") {
    return (
      <div className="grid grid-cols-3 gap-4">
        <InfoItem
          label="Total Belanja"
          value={formatRupiah(data.total_price)}
        />
        <InfoItem
          label="Total Transaksi"
          value={`${data.total_transaction} Transaksi`}
        />
        <InfoItem
          label="Rata-rata Pembelian"
          value={formatRupiah(data.buy_average)}
        />
      </div>
    );
  }

  return null;
}
