import { Purchase } from "@/features/purchase/types/purchase";
import { formatDate } from "@/utils/format-date.fns";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { purchaseStatusLabel, purchaseStatusClassName } from "@/features/purchase/constants/purchase-status.constants";
import { purchaseTypeLabel, purchaseTypeClassName } from "@/features/purchase/constants/purchase-type.constants";

interface Props {
  data: Purchase;
}

export function DetailHeader({ data }: Props) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Kode Pembelian</p>
            <p className="text-lg font-semibold tracking-wide">
              {data.purchase_code || "—"}
            </p>
          </div>
          <Badge variant="outline" className={purchaseStatusClassName[data.purchase_status]}>
            {purchaseStatusLabel[data.purchase_status]}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            {formatDate(data.purchase_date, "Senin, 29 Desember 2025")}
          </p>
          <span className="text-muted-foreground">·</span>
          <Badge variant="outline" className={purchaseTypeClassName[data.purchase_type]}>
            {purchaseTypeLabel[data.purchase_type]}
          </Badge>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <p className="text-sm font-medium">{data.supplier_name}</p>
          <span className="text-muted-foreground">·</span>
          <p className="text-sm text-muted-foreground">{data.supplier_type}</p>
        </div>
      </div>

      <Separator />
    </div>
  );
}