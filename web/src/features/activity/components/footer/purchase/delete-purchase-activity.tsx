import { DetailDialog } from "@/components/molecules/dialog/detail-dialog";
import { EmptyData } from "@/components/molecules/empty/empty-data";
import { Button } from "@/components/ui/button";
import { ActivityLogsUnion } from "@/features/activity/types/activity.types";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { Info } from "lucide-react";
import React, { useState } from "react";

interface Props {
  activity: Extract<ActivityLogsUnion, { action: "DELETE_PURCHASE" }>;
}

export function DeletePurchaseActivity({ activity }: Props) {
  const [openDetail, setOpenDetail] = useState(false);

  return (
    <>
      <div className="space-x-4">
        <Button variant={"outline"} onClick={() => setOpenDetail(true)}>
          <Info />
        </Button>
      </div>

      <DetailDialog
        Component={<DetailComponent activity={activity} />}
        description={`Detail aktivitas penjualan yang dihapus`}
        title="Detail Aktivitas Penjualan"
        open={openDetail}
        onOpenChange={setOpenDetail}
      />
    </>
  );
}

const DetailComponent: React.FC<Props> = ({ activity }) => {
  const { meta } = activity;
  if (!meta) return <EmptyData />;

  const total = meta.items.reduce((acc, curr) => acc + (curr?.price ?? 0), 0);


  return (
    <div className="space-y-6 text-sm">
      {/* Deleted Banner */}
      <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3">
        <div>
          <p className="font-semibold text-red-600">
            Data Pembelian Telah Dihapus
          </p>
          <p className="text-xs text-red-500">
            Data ini sudah tidak tersedia di sistem dan hanya tersimpan sebagai
            arsip aktivitas.
          </p>
        </div>
        <span className="text-xs font-medium text-red-600 bg-red-100 px-3 py-1 rounded-full">
          Dihapus
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-xl border bg-muted/40 p-4 space-y-1">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Nama Supplier
          </p>
          <p className="font-medium">{meta.supplier_name}</p>
        </div>

        <div className="rounded-xl border bg-muted/40 p-4 space-y-1">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Total Harga
          </p>
          <p className="font-medium">{formatRupiah(total)}</p>
        </div>
      </div>

      {/* Products Snapshot */}
      <div className="rounded-xl border bg-muted/30 p-5 space-y-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
          Produk (Sebelum Dihapus)
        </p>

        <ul className="space-y-2">
          {meta.items.map((prod, i) => (
            <li
              key={`${prod.product_name}-${i}`}
              className="flex justify-between border-b pb-1 last:border-0"
            >
              <span>{prod.product_name}</span>
              <span className="text-muted-foreground">{prod.quantity} pcs</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Reference ID */}
      <div className="text-xs text-muted-foreground pt-2">
        Reference ID: {meta.id}
      </div>
    </div>
  );
};
