import { PieChartData } from "@/components/molecules/chart/pie-chart/pie-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import { formatPercent } from "@/utils/format-percent";
import { formatRupiah } from "@/utils/format-to-rupiah";
import React from "react";

interface Props {
  chartConfig: ChartConfig;
  chartData: PieChartData[];
  Footer?: (item: PieChartData) => React.ReactNode;
}

export function DetailPieChartItems({ chartConfig, chartData, Footer }: Props) {
  const totalValue = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {chartData.map((item) => {
        const config = chartConfig[item.name];
        if (!config || totalValue === 0) return null;

        const rawPercentage = item.value / totalValue;
        const percentage = formatPercent(rawPercentage);

        return (
          <Card
            key={item.name}
            className="group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
          >
            {/* subtle top accent */}
            <div
              className="absolute top-0 left-0 h-1 w-full opacity-70"
              style={{ backgroundColor: config.color }}
            />

            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-sm font-medium">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: config.color }}
                  />
                  {item.name}
                </div>

                <span className="text-xs font-semibold text-muted-foreground">
                  {percentage}
                </span>
              </CardTitle>

              <CardDescription className="text-xs">
                Berkontribusi sebesar
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Nominal */}
              <div className="text-2xl font-bold tracking-tight">
                {formatRupiah(item.value)}
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${rawPercentage * 100}%`,
                    backgroundColor: config.color,
                  }}
                />
              </div>
            </CardContent>

            {Footer && <CardFooter>{Footer(item)}</CardFooter>}
          </Card>
        );
      })}
    </div>
  );
}
