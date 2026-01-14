import { InfoItem } from "@/components/molecules/items/info-item";
import {
  GetSummaryQuery,
  GetSummaryResponse,
} from "../../interface/sales-summary";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { formatPercent } from "@/utils/format-percent";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils/format-date.fns";

export function SalesSummaryData({
  data,
  query,
}: {
  data: GetSummaryResponse;
  query: GetSummaryQuery;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-center font-semibold text-2xl">
        Ringkasan Penjualan
      </h3>
      <div className="flex justify-between">
        <p className="text-sm font-semibold">
          {formatDate(query.startDate, "29 Desember 2025")}
        </p>
        <p className="text-sm font-semibold">
          {formatDate(query?.endDate ?? query.startDate, "29 Desember 2025")}
        </p>
      </div>
      <Separator />
      <div className="grid grid-cols-2 gap-4">
        <InfoItem label="Omzet" value={formatRupiah(data.total_amount)} />
        <InfoItem
          label="Total Transaksi"
          value={`${data.total_transaction} Transaksi`}
        />
        <InfoItem label="Margin" value={formatRupiah(data.margin)} />
        <InfoItem label="HPP" value={formatRupiah(data.total_hpp)} />
        <InfoItem
          label="Margin %"
          value={formatPercent(data.margin_percent / 100)}
        />
        <InfoItem
          label="Markdown %"
          value={formatPercent(data.markdown_percent / 100)}
        />
      </div>
      <Separator />
    </div>
  );
}
