import { formatRupiah } from "@/utils/format-to-rupiah";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface LineChartData {
  label: string;
  value: number;
}

export interface MyLineChartProps {
  data?: LineChartData[];
  stroke?: string;
  lineName?: string;
}

const dummyData: LineChartData[] = [
  {
    label: "Page A",
    value: 400,
  },
  {
    label: "Page B",
    value: 300,
  },
  {
    label: "Page C",
    value: 320,
  },
  {
    label: "Page D",
    value: 200,
  },
  {
    label: "Page E",
    value: 278,
  },
  {
    label: "Page F",
    value: 189,
  },
];

export function MyLineChartComp({
  data = dummyData,
  stroke = "purple",
  lineName = "Example Data",
}: MyLineChartProps) {
  return (
    <LineChart
      className="w-full"
      style={{ width: "100%", aspectRatio: 3 }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 20,
        bottom: 5,
        left: 0,
      }}
    >
      <CartesianGrid stroke="#aaa" strokeDasharray={"5 5"} />
      <Line
        dataKey="value"
        type={"monotone"}
        stroke={stroke}
        strokeWidth={2}
        name={lineName}
      />
      <XAxis dataKey={"label"} />
      <YAxis
        width={"auto"}
        label={{ value: "Nominal", position: "insideLeft", angle: -90 }}
      />
      <Legend align="right" />
      <Tooltip
        formatter={(value, name) => [formatRupiah(Number(value)), name]}
      />
    </LineChart>
  );
}
