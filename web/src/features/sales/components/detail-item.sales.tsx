import { Separator } from "@/components/ui/separator";
import { SalesItemApiResponse } from "../types/sales-item-api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { InfoItem } from "@/components/ui/info-item";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { formatPercent } from "@/utils/format-percent";
import { calculateProfit } from "../utils/calculate-profit";
import { useClipboard } from "@/hooks/use-clipboard";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  items: SalesItemApiResponse[];
}

export function DetailItem({ items }: Props) {
  const { copy } = useClipboard();

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg text-center text-gray-500">
        Barang Yang Dibeli
      </h3>
      <Separator />
      <Tabs className="w-full max-w-md" defaultValue={items?.[0]?.id}>
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <TabsList>
            {items.map((item, i) => (
              <TabsTrigger
                key={item.id}
                value={item.id}
                className="px-3 data-[state=inactive]:cursor-pointer"
              >
                {i + 1}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        {items.map((item) => {
          const { margin, marginPercent, markup, markupPercent } =
            calculateProfit(item.subtotal, item.hpp);

          return (
            <TabsContent value={item.id} key={item.id} className="space-y-4">
              <div className="flex items-center gap-4">
                <InfoItem label="Nama Produk : " value={item.product_id.name} />
                <Button
                  size={"icon-sm"}
                  variant={"ghost"}
                  onClick={() =>
                    copy(item.product_id.id, {
                      successMessage: "ID Produk berhasil dicopy",
                    })
                  }
                >
                  <Copy />
                </Button>
              </div>
              <InfoItem
                label={`Jumlah (${item.product_id.unit}) : `}
                value={`${item.quantity} ${item.product_id.unit}`}
              />
              <div className="grid md:grid-cols-2">
                <InfoItem
                  label="Omzet"
                  value={`${formatRupiah(item.subtotal, 2)}`}
                />
                <InfoItem label="HPP" value={`${formatRupiah(item.hpp, 2)}`} />
              </div>
              <div className="grid md:grid-cols-2">
                <InfoItem label="Tip" value={`${formatRupiah(item.tip, 2)}`} />
                <InfoItem
                  label="Diskon"
                  value={`${formatRupiah(item.discount, 2)}`}
                />
              </div>
              <div className="grid md:grid-cols-2">
                <InfoItem
                  label="Margin"
                  value={`${formatRupiah(margin, 2)} (${formatPercent(
                    marginPercent,
                    {
                      locale: "id",
                      maximumFractionDigits: 2,
                    }
                  )})`}
                />
                <InfoItem
                  label="Markup"
                  value={`${formatRupiah(markup, 2)} (${formatPercent(
                    markupPercent,
                    {
                      locale: "id",
                      maximumFractionDigits: 2,
                    }
                  )})`}
                />
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
