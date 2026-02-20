import {
  LineChartData,
  MyLineChartComp,
} from "@/components/molecules/chart/line-chart/line-chart";
import { DataTable } from "@/components/organisms/custom-data-table/core-table";
import { movementGlobalColumns } from "../columns/columns-global.cashflow-report";
import { MovementAssetSummary } from "@/features/cashflow-report/types/api-return.types";

interface Props {
  data: MovementAssetSummary[];
}

export function GlobalMovement({ data }: Props) {
  const mappedData: LineChartData[] = data
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((d) => ({
      label: d.date,
      value: d.running_total,
    }));

  return (
    <>
      <MyLineChartComp
        chartData={mappedData}
        lineName="Aset Keseluruhan"
      />
      <DataTable columns={movementGlobalColumns} data={data} />
    </>
  );
}
