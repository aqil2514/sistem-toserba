import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProductEmpty({
  onAdd,
}: {
  onAdd: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <Package className="h-10 w-10 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">
        Belum ada produk
      </p>
      <Button size="sm" onClick={onAdd}>
        Tambah Produk
      </Button>
    </div>
  );
}
