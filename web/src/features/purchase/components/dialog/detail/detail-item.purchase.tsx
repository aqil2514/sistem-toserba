import { OneLineItem } from "@/components/molecules/items/one-line-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { PurchaseMappedDetail } from "@/features/purchase/types/purchase-mapped-detail";
import { formatRupiah } from "@/utils/format-to-rupiah";

interface Props {
  items: PurchaseMappedDetail[];
}
export function DetailItem({ items }: Props) {
  const totalPrice = items.reduce((acc, curr) => acc + curr.price, 0);
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground font-semibold text-lg">
        Item yang Dibeli
      </p>
      <Separator />
      <ScrollArea className="h-96 px-4">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="border rounded-2xl border-gray-300 px-2 py-4 flex justify-between"
            >
              <div className="space-y-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-muted-foreground text-sm">
                  Qty : {item.quantity} • Sisa : {item.remaining_quantity}{" "}
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-right">
                  {formatRupiah(item.price)}
                </p>
                <p className="text-muted-foreground text-sm">
                  HPP : {formatRupiah(item.hpp, 2)}{" "}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <Separator />
      <OneLineItem label="Total Barang" value={items.length} />
      <OneLineItem label="Total Nominal" value={formatRupiah(totalPrice)} />
    </div>
  );
}
