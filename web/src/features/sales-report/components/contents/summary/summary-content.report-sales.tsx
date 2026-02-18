import { InfoItem } from "@/components/molecules/items/info-item";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useSalesReportSummary } from "@/features/sales-report/store/sales-report-summary.provider";
import { formatNumber } from "@/utils/format-number";
import { formatPercent } from "@/utils/format-percent";
import { formatRupiah } from "@/utils/format-to-rupiah";

export function SalesReportSummaryContent() {
  const { data } = useSalesReportSummary();

  if (!data) return <LoadingSpinner label="Mengambil data..." />;

  const averageOrderValue =
    data.total_transaction > 0 ? data.omzet / data.total_transaction : 0;

  const marginPerTransaction =
    data.total_transaction > 0 ? data.margin / data.total_transaction : 0;

  const hppRatio = data.omzet > 0 ? data.hpp / data.omzet : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <InfoItem label="Omzet" value={formatRupiah(data.omzet, 0)} />
      <InfoItem label="HPP" value={formatRupiah(data.hpp, 0)} />
      <InfoItem label="Margin" value={formatRupiah(data.margin, 0)} />
      <InfoItem
        label="Margin %"
        value={formatPercent(data.margin_percent, {
          maximumFractionDigits: 2,
        })}
      />
      <InfoItem
        label="Markup %"
        value={formatPercent(data.markup_percent, {
          maximumFractionDigits: 2,
        })}
      />
      <InfoItem
        label="Rasio HPP"
        value={formatPercent(hppRatio, { maximumFractionDigits: 2 })}
      />
      <InfoItem
        label="Total Transaksi"
        value={`${formatNumber(data.total_transaction)} Transaksi`}
      />
      <InfoItem
        label="Rata-rata Transaksi"
        value={formatRupiah(averageOrderValue, 0)}
      />
      <InfoItem
        label="Margin per Transaksi"
        value={formatRupiah(marginPerTransaction, 0)}
      />
    </div>
  );
}
