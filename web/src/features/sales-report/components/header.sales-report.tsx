import { Separator } from "@/components/ui/separator";
import { useSalesReport } from "../store/provider.sales-report";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function SalesReportHeader() {
  const { data, isSummarizedData, setIsSummarizedData } = useSalesReport();
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl">Laporan Penjualan</h1>

        <div className="flex items-center space-x-2">
          <Label htmlFor="data-mode">
            Mode : {isSummarizedData ? "Ringkasan" : "Full"}
          </Label>
          <Switch
            id="data-mode"
            checked={isSummarizedData}
            onCheckedChange={(e) => setIsSummarizedData(e)}
          />
        </div>
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
