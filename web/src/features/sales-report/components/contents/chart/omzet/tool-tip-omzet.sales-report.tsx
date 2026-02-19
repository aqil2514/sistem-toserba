import type { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { formatDate } from "@/utils/format-date.fns";

export function ToolTipOmzetSalesReport({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) {
  if (!active || !payload?.length) return null;

  // Ambil slice pertama
  const item = payload[0];
  const label = new Date(item.payload.label);
  const color = item.color

  return (
    <div className="bg-slate-100 rounded-2xl p-3 flex items-center gap-3 shadow-md">
      {/* Circle warna slice */}
      <div
        className="w-3 h-3 rounded-full shrink-0"
        style={{ backgroundColor: color }}
      />
      {/* Label dan value */}
      <p className="text-sm font-medium text-slate-900">
        {formatDate(label, "Senin, 29 Desember 2025")}
      </p>
      <p className="text-sm font-medium text-green-500">
        {formatRupiah(Number(item.value))}
      </p>
    </div>
  );
}
