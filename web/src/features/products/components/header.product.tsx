import { Button } from "@/components/ui/button";
import { useProducts } from "../store/provider.products";
import { MutateButton } from "@/components/ui/mutate-button";

export function ProductHeader() {
  const { setDialogAdd, mutate } = useProducts();
  return (
    <div className="flex sm:flex-row flex-col gap-4 items-start justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight">Produk</h1>
        <p className="text-sm text-muted-foreground">
          Daftar produk yang digunakan untuk transaksi penjualan
        </p>
      </div>

      <div className="flex gap-4">
        <MutateButton
          mutate={mutate}
          successToastMessage="Data produk telah dimuat ulang"
        />
        <Button size="sm" onClick={() => setDialogAdd(true)}>
          Tambah Produk
        </Button>
      </div>
    </div>
  );
}
