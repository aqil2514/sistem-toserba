import { SalesReportPerProductCartType } from "@/features/sales-report/types/chart.report-sales-type";
import { TopSalesReport } from "./filter/top-sales-report";
import React, { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LabelValue } from "@/@types/general";
import {
  MyPieChartComp,
  PieChartData,
} from "@/components/molecules/chart/pie-chart";

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
        <TopSalesReport narationText="Tampilkan data produk sebanyak" />
        <ValueTypeSelector onValueChange={setValueType} value={valueType} />
      </div>
      <MyPieChartComp data={mappedData} />
    </div>
  );
}

interface ValueTypeSelectorProps {
  value: ValueType;
  onValueChange: (value: ValueType) => void;
}
const ValueTypeSelector: React.FC<ValueTypeSelectorProps> = ({
  onValueChange,
  value,
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {valueSelect.map((mode) => (
            <SelectItem value={mode.value} key={mode.value}>
              {mode.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
