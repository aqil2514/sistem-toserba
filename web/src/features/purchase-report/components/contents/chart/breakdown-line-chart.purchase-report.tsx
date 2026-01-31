import { InfoItem } from "@/components/molecules/items/info-item";
import { PurchaseReportChartBreakdownMode } from "@/features/purchase-report/types/api-response.purchase-report";
import { mapToLineChart } from "@/features/purchase-report/utils/map-to-line-chart";
import { formatDate } from "@/utils/format-date.fns";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { ChartDataSelect } from "./chart-content.purchase-report";
import { MyLineChartComp } from "@/components/molecules/chart/line-chart";

interface Props {
  data: PurchaseReportChartBreakdownMode["data"];
}

export function PurchaseReportBreakdownLineChart({ data }: Props) {
  const mappedData = mapToLineChart(data);
  return (
    <div className="space-y-4">
      <ChartDataSelect />
      <MyLineChartComp data={mappedData} lineName="Total Belanja" />
      <Insight data={data} />
    </div>
  );
}

const Insight = ({ data }: Props) => {
  const prices = data.map((d) => d.price);
  const highestPurchase = Math.max(...prices);
  const highestPurchaseDate = data.find((d) => d.price === highestPurchase);
  const lowestPurchase = Math.min(...prices);
  const lowestPurchaseDate = data.find((d) => d.price === lowestPurchase);
  const totalPurchase = data.reduce((acc, curr) => acc + curr.price, 0);
  const averagePurchaseAmount = totalPurchase / prices.length;

  return (
    <div className="grid grid-cols-3 gap-4">
      <InfoItem label="Total Belanja" value={formatRupiah(totalPurchase)} />
      {highestPurchaseDate && (
        <InfoItem
          label="Belanja Tertinggi"
          value={`${formatRupiah(highestPurchase)} (${formatDate(highestPurchaseDate.date, "29 Desember 2025")})`}
        />
      )}
      {lowestPurchaseDate && (
        <InfoItem
          label="Belanja Terendah"
          value={`${formatRupiah(lowestPurchase)} (${formatDate(lowestPurchaseDate.date, "29 Desember 2025")})`}
        />
      )}
      <InfoItem
        label="Rata-rata Belanja"
        value={`${formatRupiah(averagePurchaseAmount)} (${prices.length} Hari)`}
      />
    </div>
  );
};
