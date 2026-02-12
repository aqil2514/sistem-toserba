import { useState } from "react";
import { formatRupiah } from "@/utils/format-to-rupiah";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import type { LegendPayload } from "recharts";

export interface MultiLineChartRow {
  label: string;
  [key: string]: string | number;
}

export interface MultiLineChartProps {
  data?: MultiLineChartRow[];
  lineKeys?: string[];
}

const COLORS: string[] = [
  "#7c3aed",
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#f59e0b",
  "#0ea5e9",
];

export const dummyMultiLineData: MultiLineChartRow[] = [
  { label: "Jan", income: 4000000, expense: 2500000 },
  { label: "Feb", income: 5200000, expense: 3100000 },
  { label: "Mar", income: 4800000, expense: 2900000 },
  { label: "Apr", income: 6100000, expense: 3500000 },
  { label: "May", income: 7000000, expense: 4200000 },
];

export const dummyLineKeys: string[] = ["income", "expense"];

export function MultiLineChart({ data = dummyMultiLineData, lineKeys = dummyLineKeys }: MultiLineChartProps) {
  const [hiddenLines, setHiddenLines] = useState<string[]>([]);

  const handleLegendClick = (payload: LegendPayload) => {
    const dataKey = String(payload.dataKey);

    setHiddenLines((prev) =>
      prev.includes(dataKey)
        ? prev.filter((k) => k !== dataKey)
        : [...prev, dataKey],
    );
  };

  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
      >
        <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />

        <XAxis dataKey="label" />

        <YAxis
          width="auto"
          label={{ value: "Nominal", position: "insideLeft", angle: -90 }}
        />

        <Tooltip
          formatter={(value, name) => [formatRupiah(Number(value)), name]}
        />

        <Legend
          align="right"
          onClick={(e) => {
            if (e && "dataKey" in e) {
              handleLegendClick(e as LegendPayload);
            }
          }}
        />

        {lineKeys.map((key, index) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={COLORS[index % COLORS.length]}
            strokeWidth={2}
            hide={hiddenLines.includes(key)}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
