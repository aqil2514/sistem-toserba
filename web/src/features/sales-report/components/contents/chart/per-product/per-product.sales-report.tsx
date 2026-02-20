import { SalesReportPerProductCartType } from "@/features/sales-report/types/chart.report-sales-type";
import React, { useMemo, useState } from "react";
import { LabelValue } from "@/@types/general";
import {
  MyPieChartComp,
  PieChartData,
} from "@/components/molecules/chart/pie-chart/pie-chart";
import { FilterTop } from "@/components/filters/filter-top";
import { FilterValueType } from "@/components/filters/filter-value-type";
import { ToolTipProductSalesReport } from "./tool-tip-product.sales-report";
import { ChartConfig } from "@/components/ui/chart";
import { DetailPieChartItems } from "../../../../../../components/molecules/chart/pie-chart/detail-chart-items";
import { Button } from "@/components/ui/button";
import { useQueryParams } from "@/hooks/use-query-params";
import Link from "next/link";

interface Props {
  data: SalesReportPerProductCartType["data"];
}

export type ValueType = "total_revenue" | "total_quantity" | "total_margin";

const valueSelect: LabelValue<ValueType>[] = [
  {
    value: "total_margin",
    label: "Margin",
  },
  {
    value: "total_quantity",
    label: "Kuantitas",
  },
  {
    value: "total_revenue",
    label: "Omzet",
  },
];

export function SalesReportChartPerProduct({ data }: Props) {
  const [valueType, setValueType] = useState<ValueType>("total_revenue");

  const mappedData: PieChartData[] = useMemo(() => {
    return data.map((d) => {
      const value = d[valueType];
      const name = d.label;

      return {
        name,
        value,
      };
    });
  }, [data, valueType]);

  const chartConfig = useMemo(() => {
    const config = {} as ChartConfig;

    mappedData.forEach((item, index) => {
      config[item.name] = {
        label: item.name,
        color: `hsl(${(index * 137.508) % 360}, 60%, 55%)`,
      };
    });

    return config;
  }, [mappedData]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <FilterTop
          enterInfoToast="Menampilkan data produk sebanyak"
          narationText="Tampilkan data produk sebanyak"
        />
        <FilterValueType
          options={valueSelect}
          onValueChange={setValueType}
          value={valueType}
        />
      </div>
      <MyPieChartComp
        data={mappedData}
        chartConfig={chartConfig}
        ToolTipContent={(props) => (
          <ToolTipProductSalesReport valueType={valueType} {...props} />
        )}
      />
      <DetailPieChartItems
        chartConfig={chartConfig}
        chartData={mappedData}
        Footer={(item) => <PerProductFooter item={item} />}
      />
    </div>
  );
}

interface FooterProps {
  item: PieChartData;
}
const PerProductFooter: React.FC<FooterProps> = ({ item }) => {
  const { get } = useQueryParams();
  const from = get("from") ?? new Date().toISOString();
  const to = get("to") ?? new Date().toISOString();

  const detailParams = new URLSearchParams({
    content: "detail",
    mode: "product",
    page: "1",
    filter: `product_name:eq:${item.name}`,
    from: from,
    to: to,
  });

  const transactionParams = new URLSearchParams({
    content: "detail",
    mode: "full",
    page: "1",
    filter: `product_id.name:eq:${item.name}`,
    from: from,
    to: to,
  });

  return (
    <div className="flex w-full gap-2">
      <Link href={`?${detailParams.toString()}`}>
        <Button variant="outline" className="flex-1">
          Detail
        </Button>
      </Link>
      <Link href={`?${transactionParams.toString()}`}>
      <Button variant={"outline"} className="flex-1">
        Lihat Transaksi
      </Button>
      </Link>
    </div>
  );
};
