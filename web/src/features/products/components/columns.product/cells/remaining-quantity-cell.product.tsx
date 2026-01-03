import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useProducts } from "@/features/products/store/provider.products";
import { ProductInHistory } from "@/features/products/types/product-in-history";
import { api } from "@/lib/api";
import { Row } from "@tanstack/react-table";
import { Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { KeyedMutator } from "swr";

interface Props {
  row: Row<ProductInHistory>;
  mutate: KeyedMutator<ProductInHistory[]>;
}

export function RemainingQuantityCell({ row, mutate }: Props) {
  const init = row.original.remaining_quantity;
  const { mutate: mutateAll } = useProducts();
  const [value, setValue] = useState<number>(init);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const maxValue = row.original.quantity;

  const submitHandler = async () => {
    if (value > maxValue)
      return toast.error("Value tidak boleh melebihi batch pembelian");

    try {
      setIsLoading(true);
      await api.patch(`/purchase/${row.original.id}/remaining_quantity`, {
        remaining_quantity: value,
      });

      mutate();
      mutateAll?.();
      toast.success("Sisa stok berhasil diperbarui!");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  if (isEditing)
    return (
      <div className="space-y-2">
        <Input
          ref={inputRef}
          type="number"
          value={value}
          min={0}
          disabled={isLoading}
          max={maxValue}
          onChange={(e) => setValue(e.target.valueAsNumber)}
          onFocus={(e) => e.target.select()}
          onKeyDown={(e) => {
            if (e.key === "Enter") return submitHandler();
          }}
        />
        <div className="flex gap-2">
          <Button
            variant={"outline"}
            size={"icon-sm"}
            onClick={() => {
              setIsEditing(false);
              setValue(init);
            }}
            disabled={isLoading}
          >
            <X />
          </Button>

          <Button
            variant={"outline"}
            size={"icon-sm"}
            disabled={isLoading}
            onClick={submitHandler}
          >
            {isLoading ? <Spinner /> : <Check />}
          </Button>
        </div>
      </div>
    );

  return (
    <Button
      variant={"ghost"}
      className="w-full justify-start"
      onClick={() => setIsEditing(true)}
    >
      {init}
    </Button>
  );
}
