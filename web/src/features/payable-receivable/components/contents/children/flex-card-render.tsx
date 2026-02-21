import { InfoItem } from "@/components/molecules/items/info-item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  PayableTypes,
  ReceivableTypes,
} from "@/features/payable-receivable/types/receivable-payable-types";
import { useQueryParams } from "@/hooks/use-query-params";
import { cn } from "@/lib/utils";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { MoreHorizontal } from "lucide-react";

interface Props {
  data: PayableTypes | ReceivableTypes;
}

export function FlexCardRender({ data }: Props) {
  const { update } = useQueryParams({ replace: true });
  const isReceivable = data.type === "receivable";
  const name = isReceivable ? data.customer_name : data.vendor_name;

  const statusLabel = data.status === "paid" ? "Lunas" : "Belum Lunas";
  const statusClass =
    data.status === "paid"
      ? "border-green-300 text-green-600 bg-green-50"
      : "border-yellow-300 text-yellow-700 bg-yellow-50";

  const restClass = isReceivable
    ? data.rest > 0
      ? "text-yellow-600"
      : "text-green-600"
    : data.rest > 0
      ? "text-red-600"
      : "text-green-600";

  const detailHandler = () => {
    update({
      detail_type: data.type,
      detail_counterpart_name: name,
    });
  };

  const addPaymentHandler = () => {
    update({
      add_payment_type: data.type,
      add_payment_name: name,
    });
  };

  const updatePayRecHandler = () => {
    update({
      update_payment_type: data.type,
      update_payment_name: name,
    });
  };

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold truncate">
          {name}
        </CardTitle>

        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={cn(
              "text-xs font-medium",
              isReceivable
                ? "border-blue-300 text-blue-600 bg-blue-50"
                : "border-red-300 text-red-600 bg-red-50",
            )}
          >
            {isReceivable ? "Piutang" : "Utang"}
          </Badge>

          <Badge
            variant="outline"
            className={cn("text-xs font-medium", statusClass)}
          >
            {statusLabel}
          </Badge>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={detailHandler}>
                Lihat Detail
              </DropdownMenuItem>
              <DropdownMenuItem onClick={addPaymentHandler}>
                Tambah Pelunasan
              </DropdownMenuItem>
              <DropdownMenuItem onClick={updatePayRecHandler}>
                Tambah {isReceivable ? "Piutang" : "Utang"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Separator />

        <div className="flex justify-between">
          <InfoItem
            label={`Total ${isReceivable ? "Piutang" : "Utang"}`}
            value={
              <p className="font-medium text-green-600">
                {formatRupiah(data.total)}
              </p>
            }
          />

          <InfoItem
            label="Sudah Dibayar"
            value={
              <p className="font-medium text-blue-600 text-right">
                {formatRupiah(data.paid)}
              </p>
            }
          />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Sisa {isReceivable ? "Piutang" : "Utang"}
          </p>
          <p className={cn("text-lg font-bold", restClass)}>
            {formatRupiah(data.rest)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
