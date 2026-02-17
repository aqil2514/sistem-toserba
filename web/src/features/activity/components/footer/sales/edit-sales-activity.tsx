import { DetailDialog } from "@/components/molecules/dialog/detail-dialog";
import { EmptyData } from "@/components/molecules/empty/empty-data";
import { InfoItem } from "@/components/molecules/items/info-item";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ActivityLogsUnion } from "@/features/activity/types/activity.types";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { ExternalLink, Info } from "lucide-react";
import React, { useState } from "react";

interface Props {
  activity: Extract<ActivityLogsUnion, { action: "EDIT_SALES" }>;
}

export function EditSalesFooter({ activity }: Props) {
  const [openDetail, setOpenDetail] = useState(false);

  return (
    <>
      <div className="space-x-4">
        <Button variant={"outline"} onClick={() => setOpenDetail(true)}>
          <Info />
        </Button>
        <Button
          variant={"outline"}
          onClick={() =>
            window.open(
              `/sales?action=detail&id=${activity.reference_id}`,
              "_blank",
              "noopener,noreferrer",
            )
          }
        >
          <ExternalLink />
        </Button>
      </div>

      <DetailDialog
        Component={<DetailComponent activity={activity} />}
        description={`Detail aktivitas penjualan`}
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

  return (
    <div className="space-y-6 text-sm">
      <Separator />

      {/* Header Info */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-muted/40 border rounded-xl p-4">
          <InfoItem
            label="Nama Customer"
            value={`${meta.customer_name.old} → ${meta.customer_name.new}`}
          />
        </div>

        <div className="bg-muted/40 border rounded-xl p-4">
          <InfoItem
            label="Total Harga"
            value={`${formatRupiah(meta.total_amount.old)} → ${formatRupiah(
              meta.total_amount.new,
            )}`}
          />
        </div>
      </div>

      <Separator />

      {/* Products Comparison */}
      <div className="grid grid-cols-2 gap-8">
        {/* Before */}
        <div className="space-y-4 bg-muted/30 border rounded-xl p-5">
          <p className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">
            Produk Sebelum Diedit
          </p>

          <ul className="space-y-2">
            {meta.products.old.map((prod, i) => (
              <li
                key={`${i + 1}`}
                className="flex justify-between border-b pb-1 last:border-0"
              >
                <span>{prod.product_name}</span>
                <span className="text-muted-foreground">
                  {prod.quantity} pcs
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* After */}
        <div className="space-y-4 bg-muted/30 border rounded-xl p-5">
          <p className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">
            Produk Setelah Diedit
          </p>

          <ul className="space-y-2">
            {meta.products.new.map((prod, i) => (
              <li
                key={`${i + 1}`}
                className="flex justify-between border-b pb-1 last:border-0"
              >
                <span>{prod.product_name}</span>
                <span className="text-muted-foreground">
                  {prod.quantity} pcs
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
