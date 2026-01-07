"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

import { formatDate } from "@/utils/format-date";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";

export interface MappedResponse {
  purchase_id?: string;
  product_id: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  remaining_quantity: number;
  unit: string;
  hpp: number;
}

export function PurchaseDetailDialog() {
  const shouldFetch = Boolean(open && purchase?.id);

  const {
    data: apiData,
    isLoading,
    error,
  } = useFetch<MappedResponse[]>(
    shouldFetch ? `${SERVER_URL}/purchase/${purchase?.id}` : null
  );

  if (!purchase) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-6xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Detail Pembelian</DialogTitle>
          <DialogDescription>
            Informasi pembelian dan item yang dibeli
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="flex flex-1 overflow-hidden gap-6">
          {/* ===== LEFT ===== */}
          <aside className="w-1/3 min-w-70 border-r pr-6 space-y-4">
            <SectionTitle>Informasi Pembelian</SectionTitle>

            <DetailRow label="Kode" value={purchase.purchase_code ?? "—"} />
            <DetailRow
              label="Tanggal"
              value={formatDate(purchase.purchase_date)}
            />
            <DetailRow
              label="Supplier"
              value={purchase.supplier_name ?? "Tanpa supplier"}
            />
            <DetailRow
              label="Catatan"
              value={purchase.notes ?? "—"}
              multiline
            />
          </aside>

          {/* ===== RIGHT ===== */}
          <section className="flex-1 flex flex-col overflow-hidden">
            <SectionTitle>Item Dibeli</SectionTitle>

            {isLoading && (
              <div className="flex-1 flex items-center justify-center">
                <LoadingSpinner label="Memuat item pembelian..." />
              </div>
            )}

            {error && (
              <div className="flex-1 flex items-center justify-center text-sm text-destructive">
                Gagal memuat item pembelian
              </div>
            )}

            {!isLoading && !error && (
              <>
                <div className="flex-1 overflow-hidden">
                  <ScrollArea className="h-full pr-2">
                    <div className="space-y-3 pb-4">
                      {data?.length === 0 && (
                        <div className="text-sm text-muted-foreground text-center py-10">
                          Tidak ada item pembelian
                        </div>
                      )}

                      {data?.map((item) => (
                        <ItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <ItemSummaryFooter items={data ?? []} />
              </>
            )}
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ================== UI PARTS ================== */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
      {children}
    </h3>
  );
}

function DetailRow({
  label,
  value,
  multiline,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div className="space-y-1">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div
        className={`text-sm font-medium ${
          multiline ? "whitespace-pre-wrap" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function ItemCard({ item }: { item: MappedResponse }) {
  return (
    <div className="rounded-lg border p-4 flex justify-between gap-4">
      <div className="space-y-1">
        <div className="font-medium">
          {item.name}
          <span className="ml-2 text-xs text-muted-foreground">
            ({item.unit})
          </span>
        </div>

        <div className="text-xs text-muted-foreground">
          Qty: {item.quantity} • Sisa: {item.remaining_quantity}
        </div>
      </div>

      <div className="text-right text-sm">
        <div className="font-medium">
          Rp {item.price.toLocaleString("id-ID")}
        </div>

        {item.hpp !== null && (
          <div className="text-xs text-muted-foreground">
            HPP: Rp {item.hpp.toLocaleString("id-ID")}
          </div>
        )}
      </div>
    </div>
  );
}

function ItemSummaryFooter({ items }: { items: MappedResponse[] }) {
  const totalQty = items.reduce((s, i) => s + i.quantity, 0);
  const totalValue = items.reduce((s, i) => s + i.price, 0);

  return (
    <div className="border-t pt-4 mt-2 space-y-2">
      <Separator />

      <SummaryRow label="Total Item" value={items.length} />
      <SummaryRow label="Total Qty" value={totalQty} />
      <SummaryRow
        label="Total Nilai"
        value={`Rp ${totalValue.toLocaleString("id-ID")}`}
        strong
      />
    </div>
  );
}

function SummaryRow({
  label,
  value,
  strong,
}: {
  label: string;
  value: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={strong ? "font-semibold" : "font-medium"}>{value}</span>
    </div>
  );
}
