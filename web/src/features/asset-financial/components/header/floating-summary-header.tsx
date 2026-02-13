import { useMemo } from "react";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FloatingContainer } from "@/components/ui/floating-container";
import { useAssetFinancial } from "../../store/asset-financial.store";

export function FloatingSummaryHeader() {
  const { headerSelected, setHeaderSelected } = useAssetFinancial();
  const isOpen = headerSelected.length > 0;

  const summary = useMemo(() => {
    return headerSelected.reduce(
      (acc, curr) => {
        acc.total += curr.value;
        return acc;
      },
      { total: 0 },
    );
  }, [headerSelected]);

  const onReset = () => setHeaderSelected([]);

  return (
    <FloatingContainer isOpen={isOpen}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">
            {headerSelected.length} Ringkasan Header Dipilih
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
    </FloatingContainer>
  );
}
