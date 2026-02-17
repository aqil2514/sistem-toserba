import { Button } from "@/components/ui/button";
import { useQueryParams } from "@/hooks/use-query-params";

export function PurchaseHeader() {
  const { set } = useQueryParams();
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-lg font-semibold">Barang Masuk</h1>

      <Button variant={"outline"} onClick={() => set("action", "add")}>
        Tambah Pembelian
      </Button>
    </div>
  );
}
