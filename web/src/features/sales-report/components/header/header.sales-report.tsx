import { SalesReportModeSelect } from "./mode-select.sales-report";

export function SalesReportHeader() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl">Laporan Penjualan</h1>

        <SalesReportModeSelect />
      </div>
    </div>
  );
}
