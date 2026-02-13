import { useMemo } from "react";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FloatingContainer } from "@/components/ui/floating-container";
import { useAssetFinancial } from "../../store/asset-financial.store";

export function FloatingSummaryContents() {
  const { assetSelected, setAssetSelected } = useAssetFinancial();
  const isOpen = assetSelected.length > 0;

  const summary = useMemo(() => {
    return assetSelected.reduce(
      (acc, curr) => {
        acc.income += curr.income;
        acc.expense += curr.expense;
        acc.total += curr.total;
        return acc;
      },
      { income: 0, expense: 0, total: 0 },
    );
  }, [assetSelected]);

  const onReset = () => setAssetSelected([]);

  return (
    <FloatingContainer isOpen={isOpen}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">
            {assetSelected.length} Aset Dipilih
          </p>
          <p className="text-lg font-semibold">
            Total Gabungan: {formatRupiah(summary.total)}
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>

      <Separator className="my-4" />

      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-muted-foreground">Total Pemasukan</p>
          <p className="text-green-600 font-medium">
            {formatRupiah(summary.income)}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Total Pengeluaran</p>
          <p className="text-red-600 font-medium">
            {formatRupiah(summary.expense)}
          </p>
        </div>
      </div>
    </FloatingContainer>
  );
}
