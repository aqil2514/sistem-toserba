import { Button } from "@/components/ui/button";
import { usePurchase } from "../store/provider.purchase";

export function PurchaseHeader() {
  const { setAddOpen } = usePurchase();
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-lg font-semibold">Barang Masuk</h1>

      <Button variant={"outline"} onClick={() => setAddOpen(true)}>
        Tambah Pembelian
      </Button>
    </div>
  );
}
