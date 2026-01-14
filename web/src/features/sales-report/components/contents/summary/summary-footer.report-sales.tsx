import { Button } from "@/components/ui/button";
import { useSalesReport } from "@/features/sales-report/store/provider.sales-report";
import { isSummaryContent } from "@/features/sales-report/utils/type-guard";

function getInsight(data: {
  margin_percent: number;
  markup_percent: number;
  total_transaction: number;
}) {
  if (data.margin_percent >= 0.5) {
    return "🟢 Margin tergolong sehat dan aman.";
  }

  if (data.margin_percent >= 0.3) {
    return "🟡 Margin cukup, masih bisa dioptimalkan.";
  }

  return "🔴 Margin rendah, perlu evaluasi harga atau HPP.";
}

export function SalesReportSummaryFooter() {
  const { data, query } = useSalesReport();

  if (query.content !== "summary") return null;
  if (!data) return null;
  if (!isSummaryContent(data, "summary")) return null;

  const insight = getInsight(data);

  return (
    <div className="flex items-center justify-between text-sm text-gray-600">
      <p>{insight}</p>

      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          // TODO: implement export
          console.log("Export summary");
        }}
      >
        Export
      </Button>
    </div>
  );
}
