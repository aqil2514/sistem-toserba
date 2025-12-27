import { Button } from "@/components/ui/button";

export function ProductHeader({
  onAdd,
}: {
  onAdd: () => void;
}) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight">
          Produk
        </h1>
        <p className="text-sm text-muted-foreground">
          Daftar produk yang digunakan untuk transaksi penjualan
        </p>
      </div>

      <Button size="sm" onClick={onAdd}>
        Tambah Produk
      </Button>
    </div>
  );
}
