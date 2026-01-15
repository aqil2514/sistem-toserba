/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatPercent } from "@/utils/format-percent";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

export interface PieChartData {
  name: string;
  value: number;
}

interface Props {
  data?: PieChartData[];
}

const dummyData: PieChartData[] = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28BFE",
  "#FF5C8D",
];

export function MyPieChartComp({ data = dummyData }: Props) {
  return (
    <PieChart
      className="w-full"
      style={{ width: "100%", aspectRatio: 3 }}
      responsive
    >
      <Pie
        data={data as any}
        label={(label) => {
          return `${label.name} (${formatPercent(label.percent ?? 0, {
            maximumFractionDigits: 2,
          })})`;
        }}
        dataKey={"value"}
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip
        formatter={(value, name) => [formatRupiah(Number(value)), name]}
      />
      <Legend />
    </PieChart>
  );
}
