"use client";

import {
  CartesianGrid,
  Dot,
  Legend,
  Line,
  LineChart,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

export const description = "A line chart with dots and colors";

export interface LineChartData {
  label: string;
  value: number;
  fill?: string;
}

const dummyData: LineChartData[] = [
  { label: "chrome", value: 275, fill: "var(--color-chrome)" },
  { label: "safari", value: 200, fill: "var(--color-safari)" },
  { label: "firefox", value: 187, fill: "var(--color-firefox)" },
  { label: "edge", value: 173, fill: "var(--color-edge)" },
  { label: "other", value: 90, fill: "var(--color-other)" },
];

const dummyChartConfig = {
  visitors: {
    label: "Visitors",
    color: "var(--chart-2)",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

const defaultColors = [
  "#3b82f6", // biru
  "#10b981", // hijau
  "#f59e0b", // kuning
  "#ef4444", // merah
  "#8b5cf6", // ungu
  "#06b6d4", // cyan
  "#f43f5e", // pink
  "#22c55e", // lime
];

interface Props {
  chartData?: LineChartData[];
  chartConfig?: ChartConfig;
  ToolTipContent?: (
    props: TooltipProps<ValueType, NameType>,
  ) => React.ReactNode;
  lineName?: string;
}
export function MyLineChartComp({
  chartConfig = dummyChartConfig,
  chartData = dummyData,
  ToolTipContent,
  lineName
}: Props) {
  const configKeys = Object.keys(chartConfig);
  const firstConfig = configKeys?.[0] || undefined;
  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 24,
          left: 24,
          right: 24,
        }}
      >
        <CartesianGrid />
        <XAxis dataKey={"label"} />
        <YAxis dataKey={"value"} />
        <ChartTooltip
          cursor={true}
          content={
            ToolTipContent ? (
              (props) => <ToolTipContent {...props} />
            ) : (
              <ChartTooltipContent indicator="line" />
            )
          }
        />
        <Line
          dataKey="value"
          type="natural"
          stroke={firstConfig ? chartConfig[firstConfig].color : "#3b82f6"}
          strokeWidth={2}
          dot={({ payload, ...props }) => {
            const fillColor =
              payload.fill ??
              defaultColors[
                chartData.findIndex((d) => d.label === payload.label) %
                  defaultColors.length
              ];

            return (
              <Dot
                r={5}
                cx={props.cx}
                cy={props.cy}
                fill={fillColor}
                stroke={fillColor}
              />
            );
          }}
          name={lineName ?? undefined}
        />
        {lineName && <Legend  />}
      </LineChart>
    </ChartContainer>
  );
}
