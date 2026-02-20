import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Cell, Pie, PieChart, TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

export interface PieChartData {
  name: string;
  value: number;
  fill?: string;
}

const dummyData: PieChartData[] = [
  { name: "data1", value: 400 },
  { name: "data2", value: 300 },
  { name: "data3", value: 300 },
  { name: "data4", value: 200 },
];

const defaultConfig = {
  data1: {
    label: "Data 1",
  },
  data2: {
    label: "Data 2",
  },
  data3: {
    label: "Data 3",
  },
  data4: {
    label: "Data 4",
  },
} satisfies ChartConfig;

interface Props {
  data?: PieChartData[];
  chartConfig?: ChartConfig;
  onSliceClick?: (item: PieChartData, index: number) => void;
  ToolTipContent?: (
    props: TooltipProps<ValueType, NameType>,
  ) => React.ReactNode;
}

export function MyPieChartComp({
  data = dummyData,
  chartConfig = defaultConfig,
  onSliceClick,
  ToolTipContent,
}: Props) {
  return (
    <ChartContainer
      config={chartConfig}
      className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-96 pb-0"
    >
      <PieChart accessibilityLayer>
        <ChartTooltip
          content={
            ToolTipContent ? (
              (props) => <ToolTipContent {...props} />
            ) : (
              <ChartTooltipContent />
            )
          }
        />
        <CartesianGrid stroke="#aaa" strokeDasharray="5 5"/>
        <Pie
          data={data}
          dataKey={"value"}
          onClick={(entry, index) => {
            onSliceClick?.(entry as PieChartData, index);
          }}
        >
          {data.map((item, index) => (
            <Cell key={index} fill={getColor(item, index, chartConfig)} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}

const getColor = (item: PieChartData, index: number, config: ChartConfig) => {
  if (item.fill) return item.fill;

  const configItem = config[item.name];
  if (configItem?.color) return configItem.color;

  return getDynamicColor(index);
};

const getDynamicColor = (index: number) => {
  const hue = (index * 137.508) % 360;
  return `hsl(${hue}, 65%, 55%)`;
};
