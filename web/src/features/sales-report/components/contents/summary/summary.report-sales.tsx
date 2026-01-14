import { Separator } from "@/components/ui/separator";
import { SalesReportSummaryHeader } from "./summary-header.report-sales";
import { SalesReportSummaryContent } from "./summary-content.report-sales";

export function ReportSalesSummary() {
  return (
    <div className="bg-gray-100 p-4 rounded-2xl space-y-4">
      <h3 className="text-lg font-semibold text-center">
        Ringkasan Laporan Penjualan
      </h3>
      <SalesReportSummaryHeader />
      <Separator />
      <SalesReportSummaryContent />
    </div>
  );
}
