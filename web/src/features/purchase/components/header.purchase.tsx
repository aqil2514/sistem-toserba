import { Button } from "@/components/ui/button";

export function PurchaseHeader({
  mode,
  onAdd,
}: {
  mode: "private" | "demo";
  onAdd: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-lg font-semibold">
        Barang Masuk {mode === "demo" && "(DEMO)"}
      </h1>

      <Button onClick={onAdd}>Tambah Pembelian</Button>
    </div>
  );
}
