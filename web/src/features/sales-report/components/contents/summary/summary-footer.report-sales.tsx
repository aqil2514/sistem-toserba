import { Button } from "@/components/ui/button";
import { useSalesReport } from "@/features/sales-report/store/provider.sales-report";
import { isSummaryContent } from "@/features/sales-report/utils/type-guard";
import { api } from "@/lib/api";
import { useState } from "react";

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
  const [isLoading, setIsLoading] = useState(false);

  if (query.content !== "summary") return null;
  if (!data) return null;
  if (!isSummaryContent(data, "summary")) return null;

  const insight = getInsight(data);

  const exportHandler = async () => {
    try {
      setIsLoading(true);

      const res = await api.get("/pdf/sales-report", {
        params: query,
        responseType: "blob",
      });

      const blob = new Blob([res.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "Laporan Penjualan.pdf";
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Gagal export PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between text-sm text-gray-600">
      <p>{insight}</p>

      <Button
        disabled={isLoading}
        variant="outline"
        size="sm"
        onClick={exportHandler}
      >
        {isLoading ? "Memproses..." : "Export"}
      </Button>
    </div>
  );
}
