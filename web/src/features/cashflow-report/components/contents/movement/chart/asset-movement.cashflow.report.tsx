import { DataTable } from "@/components/organisms/custom-data-table/core-table";
import { MovementAssetViaSummary } from "@/features/cashflow-report/types/api-return.types";
import {
  MultiLineChart,
  MultiLineChartRow,
} from "@/components/molecules/chart/line-chart/multi-line-chart";
import { movementAssetColumns } from "../columns/columns-asset.cashflow-report";

interface Props {
  data: MovementAssetViaSummary["data"];
}

function mapMovementAssetViaToChart(data: MovementAssetViaSummary["data"]): {
  chartData: MultiLineChartRow[];
  lineKeys: string[];
} {
  const grouped = new Map<string, MultiLineChartRow>();
  const viaSet = new Set<string>();

  for (const item of data) {
    viaSet.add(item.via);

    if (!grouped.has(item.date)) {
      grouped.set(item.date, {
        label: item.date,
      });
    }

    const row = grouped.get(item.date)!;
    row[item.via] = item.running_total;
  }

  const chartData = Array.from(grouped.values()).sort(
    (a, b) => new Date(a.label).getTime() - new Date(b.label).getTime(),
  );

  const lineKeys = Array.from(viaSet);

  return { chartData, lineKeys };
}

export function AssetMovement({ data }: Props) {
  const { chartData, lineKeys } = mapMovementAssetViaToChart(data);

  return (
    <>
      <MultiLineChart data={chartData} lineKeys={lineKeys} />
      <DataTable categoryKey="via" columns={movementAssetColumns} data={data} />
    </>
  );
}
