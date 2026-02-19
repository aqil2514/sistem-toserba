import { SalesReportPerProductCartType } from "@/features/sales-report/types/chart.report-sales-type";
import React, { useMemo, useState } from "react";
import { LabelValue } from "@/@types/general";
import {
  MyPieChartComp,
  PieChartData,
} from "@/components/molecules/chart/pie-chart";
import { FilterTop } from "@/components/filters/filter-top";
import { FilterValueType } from "@/components/filters/filter-value-type";

interface Props {
  data: SalesReportPerProductCartType["data"];
}

type ValueType = "total_revenue" | "total_quantity" | "total_margin";

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
      <MyPieChartComp data={mappedData} />
    </div>
  );
}
