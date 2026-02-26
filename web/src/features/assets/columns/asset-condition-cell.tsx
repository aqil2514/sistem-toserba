import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import {
  PurchaseAssetsCondition,
  PurchaseAssetsDbPopulated,
} from "@/features/purchase/types/items/purchase-assets.interface";
import { api } from "@/lib/api";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { useAssetContext } from "../store/assets.store";
import { toast } from "sonner";

interface Props {
  row: Row<PurchaseAssetsDbPopulated>;
}

type ConditionConfigValue = {
  label: string;
  variant: "default" | "secondary" | "destructive";
  description: string;
};

const conditionConfig: Record<PurchaseAssetsCondition, ConditionConfigValue> = {
  new: {
    label: "Baru",
    variant: "default",
    description: "Aset ini baru dibeli",
  },
  second: {
    label: "Bekas",
    variant: "secondary",
    description: "Aset ini dibeli setelah digunakan oleh orang lain",
  },
  damaged: {
    label: "Rusak",
    variant: "destructive",
    description: "Aset ini sudah rusak",
  },
};

export function AssetConditionCell({ row }: Props) {
  const { condition, id, asset_name } = row.original;
  const { label, variant, description } = conditionConfig[condition];
  const { mutate } = useAssetContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const conditionChangeHandler = async (newCondition: string) => {
    if (newCondition === condition) return;
    try {
      setIsLoading(true);
      await api.patch(`assets/${id}/condition`, { newCondition });
      await mutate?.();
      toast.success("Data berhasil diupdate");
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Badge variant={variant} className="cursor-pointer">
          {label}
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="space-y-4">
        <PopoverHeader>
          <PopoverTitle>
            {asset_name} ({label})
          </PopoverTitle>
          <PopoverDescription>{description}</PopoverDescription>
        </PopoverHeader>
        <Separator />
        <div className="flex gap-4 justify-center flex-wrap">
          {Object.keys(conditionConfig).map((cond) => {
            const isCurrentCondition = condition === cond;
            const { label } = conditionConfig[cond as PurchaseAssetsCondition];
            return (
              <Button
                key={cond}
                size={"sm"}
                variant={isCurrentCondition ? "default" : "outline"}
                onClick={() => conditionChangeHandler(cond)}
                className="text-sm"
                disabled={isLoading}
              >
                {isLoading && (
                  <span>
                    <Spinner className="size-2" />
                  </span>
                )}
                {label}
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
