import { Button } from "@/components/ui/button";

export function ProductHeader() {
  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight">Produk</h1>
        <p className="text-sm text-muted-foreground">
          Daftar produk yang digunakan untuk transaksi penjualan
        </p>
      </div>

      <Button size="sm">
        Tambah Produk
      </Button>
    </div>
  );
}
