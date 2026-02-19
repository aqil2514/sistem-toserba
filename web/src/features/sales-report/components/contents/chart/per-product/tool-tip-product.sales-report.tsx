import type { TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { ValueType as ValueDataType } from "../per-product/per-product.sales-report";
import { formatRupiah } from "@/utils/format-to-rupiah";

interface Props extends TooltipProps<ValueType, NameType> {
  valueType: ValueDataType;
}

export function ToolTipProductSalesReport({ valueType, active, payload }: Props) {
  if (!active || !payload?.length) return null;

  // Ambil slice pertama
  const item = payload[0];
  const color = item.payload.fill as string | undefined;

  // Mapping valueType ke format display
  const mappedValue: Record<ValueDataType, string> = {
    total_margin: formatRupiah(Number(item.value) ?? 0, 2),
    total_quantity: `${item.value} pcs`,
    total_revenue: formatRupiah(Number(item.value) ?? 0),
  };

  return (
    <div className="bg-slate-100 rounded-2xl p-3 flex items-center gap-3 shadow-md">
      {/* Circle warna slice */}
      <div
        className="w-3 h-3 rounded-full shrink-0"
        style={{ backgroundColor: color }}
      />
      {/* Label dan value */}
      <p className="text-sm font-medium text-slate-900">
        {item.name}: {mappedValue[valueType]}
      </p>
    </div>
  );
}