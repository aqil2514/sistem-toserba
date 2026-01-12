import { Separator } from "@/components/ui/separator";
import { useSalesReport } from "../../store/provider.sales-report";
import { SalesReportModeSelect } from "./mode-select.sales-report";

export function SalesReportHeader() {
  const { data } = useSalesReport();
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl">Laporan Penjualan</h1>

        <SalesReportModeSelect />
      </div>
      <Separator />
      {data && (
        <div className="flex gap-4">
          <p className="font-semibold text-sm">
            {data.meta.total} Transaksi ditemukan
          </p>
        </div>
      )}
    </div>
  );
}
