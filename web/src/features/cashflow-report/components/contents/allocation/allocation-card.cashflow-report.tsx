import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CashflowAllocation } from "@/features/cashflow-report/types/cashflow-report-api-return.types";
import { formatRupiah } from "@/utils/format-to-rupiah";

const statusConfig: Record<
  string,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  income: { label: "Income", variant: "default" },
  expense: { label: "Expense", variant: "destructive" },
  receivable: { label: "Piutang", variant: "secondary" },
  payable: { label: "Utang", variant: "outline" },
};

function groupByCategory(data: CashflowAllocation[]) {
  return data.reduce<Record<string, CashflowAllocation[]>>((acc, item) => {
    if (!acc[item.category_name]) acc[item.category_name] = [];
    acc[item.category_name].push(item);
    return acc;
  }, {});
}

interface Props {
  data: CashflowAllocation[];
}
export function CashflowReportAllocationCard({ data }: Props) {
  const grouped = groupByCategory(data);

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
        <p className="text-sm">Tidak ada data alokasi untuk periode ini.</p>
      </div>
    );
  }

  const summary = data.reduce(
    (acc, item) => ({
      total_price: acc.total_price + item.total_price,
      total_transactions: acc.total_transactions + item.total_transactions,
    }),
    { total_price: 0, total_transactions: 0 },
  );

  return (
    <>
      <div className="flex items-center justify-between rounded-lg border px-4 py-3 text-sm">
        <span className="text-muted-foreground">
          Menampilkan{" "}
          <span className="font-medium text-foreground">{data.length}</span>{" "}
          kategori ·{" "}
          <span className="font-medium text-foreground">
            {summary.total_transactions}
          </span>{" "}
          transaksi
        </span>
        <span className="font-semibold">
          {formatRupiah(summary.total_price)}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Object.entries(grouped).map(([categoryName, items]) => {
          const totalPrice = items.reduce((sum, d) => sum + d.total_price, 0);
          const totalTransactions = items.reduce(
            (sum, d) => sum + d.total_transactions,
            0,
          );

          return (
            <Card key={categoryName} className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base font-semibold leading-tight">
                    {categoryName}
                  </CardTitle>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {totalTransactions} transaksi
                  </span>
                </div>
                <p className="text-lg font-bold text-foreground">
                  {formatRupiah(totalPrice)}
                </p>
              </CardHeader>

              {items.length > 1 && (
                <>
                  <Separator />
                  <CardContent className="pt-3 pb-4 flex flex-col gap-2">
                    {items.map((item, i) => {
                      const status = statusConfig[item.status_cashflow] ?? {
                        label: item.status_cashflow,
                        variant: "outline" as const,
                      };
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between text-sm"
                        >
                          <div className="flex items-center gap-2">
                            <Badge variant={status.variant} className="text-xs">
                              {status.label}
                            </Badge>
                            <span className="text-muted-foreground">
                              {item.total_transactions} transaksi
                            </span>
                          </div>
                          <span className="font-medium">
                            {formatRupiah(item.total_price)}
                          </span>
                        </div>
                      );
                    })}
                  </CardContent>
                </>
              )}

              {items.length === 1 && (
                <CardContent className="pt-0 pb-4">
                  <Badge
                    variant={
                      statusConfig[items[0].status_cashflow]?.variant ??
                      "outline"
                    }
                    className="text-xs"
                  >
                    {statusConfig[items[0].status_cashflow]?.label ??
                      items[0].status_cashflow}
                  </Badge>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </>
  );
}
