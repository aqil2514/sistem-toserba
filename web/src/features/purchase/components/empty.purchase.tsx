import { Button } from "@/components/ui/button";

export function PurchaseEmpty({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="text-center text-muted-foreground py-12">
      <p>Belum ada data barang masuk</p>
      <Button className="mt-4" onClick={onAdd}>
        Tambah Pembelian
      </Button>
    </div>
  );
}
