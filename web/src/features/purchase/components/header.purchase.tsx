import { Button } from "@/components/ui/button";
import { useQueryParams } from "@/hooks/use-query-params";
import { usePurchase } from "../store/purchase.provider";
import { MutateButton } from "@/components/ui/mutate-button";

export function PurchaseHeader() {
  const { set } = useQueryParams();
  const {mutate} = usePurchase()
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-lg font-semibold">Barang Masuk</h1>

<div className="flex gap-4">

      <Button variant={"outline"} onClick={() => set("action", "add")}>
        Tambah Pembelian
      </Button>
      <MutateButton mutate={mutate} />
</div>
    </div>
  );
}
