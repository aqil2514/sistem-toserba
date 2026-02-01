import { PurchaseReportChartCategoryMode } from "@/features/purchase-report/types/api-response.purchase-report";
import { ChartDataSelect } from "./chart-content.purchase-report";
import { mapToPieChart } from "@/features/purchase-report/utils/map-to-pie-chart";
import { MyPieChartComp } from "@/components/molecules/chart/pie-chart";
import { formatDate } from "@/utils/format-date.fns";
import { usePurchaseReport } from "@/features/purchase-report/store/provider.purchase-report";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { InfoItem } from "@/components/molecules/items/info-item";

interface Props {
  data: PurchaseReportChartCategoryMode["data"];
}

export function PurchaseReportCategoryPieChart({ data }: Props) {
  const { query } = usePurchaseReport();
  const mappedData = mapToPieChart(data);
  return (
    <div className="space-y-4">
      <ChartDataSelect />
      {mappedData.length === 0 ? (
        <p>
          Data pembelian dari{" "}
          {formatDate(query.from ?? new Date(), "29 Des 2025")} s/d{" "}
          {formatDate(query.to ?? new Date(), "29 Des 2025")} tidak ditemukan
        </p>
      ) : (
        <>
          <MyPieChartComp data={mappedData} />
          <Insight data={data} />
        </>
      )}
    </div>
  );
}

const Insight = ({ data }: Props) => {
  const values = Object.values(data);
  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold underline">
        {data.length} Kategori Produk
      </p>
      <div className="justify-between flex">
        {values.map((val, i) => (
          <InfoItem
            key={`kategori-${i + 1}`}
            label={val.category}
            value={formatRupiah(val.price)}
          />
        ))}
      </div>
    </div>
  );
};

