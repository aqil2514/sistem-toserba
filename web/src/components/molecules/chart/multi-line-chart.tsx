import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const dummyMultiLineData: MultiLineChartRow[] = [
  { label: "Jan", income: 4000000, expense: 2500000 },
  { label: "Feb", income: 5200000, expense: 3100000 },
  { label: "Mar", income: 4800000, expense: 2900000 },
  { label: "Apr", income: 6100000, expense: 3500000 },
  { label: "May", income: 7000000, expense: 4200000 },
];

const dummyChartConfig = {
  income: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  expense: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export const dummyLineKeys: string[] = ["income", "expense"];

export interface MultiLineChartRow {
  label: string;
  [key: string]: string | number;
}

export interface MultiLineChartProps {
  data?: MultiLineChartRow[];
  lineKeys?: string[];
  chartConfig?: ChartConfig;
}

const COLORS: string[] = [
  "#7c3aed", // violet
  "#2563eb", // blue
  "#16a34a", // green
  "#dc2626", // red
  "#f59e0b", // amber
  "#0ea5e9", // sky
  "#ec4899", // pink
  "#14b8a6", // teal
  "#84cc16", // lime
  "#f97316", // orange
  "#6366f1", // indigo
  "#e11d48", // rose
];

export function MultiLineChart({
  data = dummyMultiLineData,
  lineKeys = dummyLineKeys,
  chartConfig = dummyChartConfig,
}: MultiLineChartProps) {
  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={data}
        margin={{ left: 12, right: 12 }}
      >
        <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
        <XAxis
          dataKey={"label"}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />

        <YAxis tickLine={false} axisLine={false} tickMargin={8} />

        <Legend />
        {lineKeys.map((d, i) => (
          <Line
            key={d}
            dataKey={d}
            type={"monotone"}
            stroke={COLORS[i]}
            strokeWidth={2}
            dot={false}
          />
        ))}
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
      </LineChart>
    </ChartContainer>
  );

  // return (
  //   <ResponsiveContainer width="100%" aspect={3}>
  //     <LineChart
  //       data={data}
  //       margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
  //     >
  //       <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />

  //       <XAxis dataKey="label" />

  //       <YAxis
  //         label={{ value: "Nominal", position: "insideLeft", angle: -90 }}
  //       />

  //       <Tooltip
  //         formatter={(value, name) => [formatRupiah(Number(value)), name]}
  //       />

  //       <Legend
  //         align="right"
  //         onClick={(e) => {
  //           if (e && "dataKey" in e) {
  //             handleLegendClick(e as LegendPayload);
  //           }
  //         }}
  //       />

  //       {lineKeys.map((key, index) => (
  //         <Line
  //           key={key}
  //           type="monotone"
  //           dataKey={key}
  //           stroke={COLORS[index % COLORS.length]}
  //           strokeWidth={2}
  //           hide={hiddenLines.includes(key)}
  //           dot={false}
  //         />
  //       ))}
  //     </LineChart>
  //   </ResponsiveContainer>
  // );
}
