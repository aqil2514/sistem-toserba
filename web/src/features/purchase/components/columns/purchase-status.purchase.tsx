import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Row } from "@tanstack/react-table";
import { Purchase, PurchaseStatus } from "../../types/purchase";
import { Badge } from "@/components/ui/badge";
import {
  purchaseStatusClassName,
  purchaseStatusDescription,
  purchaseStatusLabel,
  purchaseStatusTitle,
} from "../../constants/purchase-status.constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { usePurchase } from "../../store/purchase.provider";

interface Props {
  row: Row<Purchase>;
}

export function PurchaseStatusBadge({ row }: Props) {
  const [open, setOpen] = useState(false);
  const { mutate } = usePurchase();
  const [isLoading, setIsLoading] = useState(false);

  const status = row.original.purchase_status;
  const rowLabel = purchaseStatusLabel[status];
  const rowClass = purchaseStatusClassName[status];
  const rowTitle = purchaseStatusTitle[status];
  const rowDescription = purchaseStatusDescription[status];

  const handleStatusChange = async (newStatus: PurchaseStatus) => {
    if (newStatus === status) return;
    try {
      await api.patch(`/purchase/${row.original.id}/purchase_status`, {
        purchase_status: newStatus,
      });
      await mutate?.();
      setIsLoading(true);
      setOpen(false);
      toast.success("Data berhasil diubah");
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message;

        toast.error(message ?? "Terjadi kesalahan");
        return;
      }
      toast.error("Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Badge variant="outline" className={cn("cursor-pointer", rowClass)}>
          {rowLabel}
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <PopoverHeader>
          <PopoverTitle>{rowTitle}</PopoverTitle>
          <PopoverDescription>{rowDescription}</PopoverDescription>
        </PopoverHeader>
        <div className="mt-3 grid grid-cols-2 gap-4">
          {(Object.keys(purchaseStatusLabel) as PurchaseStatus[]).map((s) => (
            <Button
              key={s}
              variant={s === status ? "default" : "ghost"}
              className={cn(
                "justify-start",
                s !== status && purchaseStatusClassName[s],
              )}
              disabled={s === status || isLoading}
              onClick={() => handleStatusChange(s)}
            >
              {purchaseStatusLabel[s]}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
