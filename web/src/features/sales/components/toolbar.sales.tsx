import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { CreditCard, HandCoins, Search, User } from "lucide-react";
import React, { useRef, useState } from "react";
import { ToolbarDatepicker } from "@/components/molecules/toolbar-datepicker";
import { useSales } from "../provider/sales.provider";
import { ToggleColumnKey } from "../types/query";

const queryKeys: ToggleColumnKey[] = [
  "customer_name",
  "payment_method",
  "sales_code",
];

const IconMapper: Record<ToggleColumnKey, React.ReactNode> = {
  customer_name: <User />,
  payment_method: <HandCoins />,
  sales_code: <CreditCard />,
};

const placeHolderMapper: Record<ToggleColumnKey, string> = {
  customer_name: "Contoh : Budi...",
  payment_method: "Contoh : Cash",
  sales_code: "Contoh : SALE25032....",
};

const queryLabel: Record<ToggleColumnKey, string> = {
  customer_name: "Nama Pembeli",
  payment_method: "Metode Pembayaran",
  sales_code: "Kode Penjualan",
};

export function SalesToolbar() {
  const [queryColumn, setQueryColumn] =
    useState<ToggleColumnKey>("customer_name");
  const { query: queryFilter, updateQuery } = useSales();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const searchHandler = () => {
    const element = inputRef.current;
    if (!element) return;
    const value = element.value;
    updateQuery("toggleColumnValue", value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
      <div className="flex gap-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              {IconMapper[queryColumn]}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-72 space-y-4 p-4">
            <p className="text-sm font-semibold text-muted-foreground">
              Cari data berdasarkan
            </p>

            <Separator />

            <div className="flex justify-center gap-2">
              {queryKeys.map((queryKey) => (
                <Button
                  key={queryKey}
                  variant={queryColumn === queryKey ? "default" : "outline"}
                  size="icon"
                  onClick={() => {
                    setQueryColumn(queryKey);
                    updateQuery("toggleColumnKey", queryKey);
                  }}
                >
                  {IconMapper[queryKey]}
                </Button>
              ))}
            </div>

            <Separator />

            <div className="flex items-center gap-3 rounded-md bg-muted px-3 py-2">
              {IconMapper[queryColumn]}
              <span className="text-sm font-medium">
                {queryLabel[queryColumn]}
              </span>
            </div>
          </PopoverContent>
        </Popover>

        <div className="relative flex-1">
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {IconMapper[queryColumn]}
          </div>

          <div className="relative">
            <Input
              className="pl-10"
              ref={inputRef}
              placeholder={placeHolderMapper[queryColumn]}
              onKeyDown={(e) => {
                if (e.key === "Enter") return searchHandler();
              }}
            />
            <Button
              className="absolute right-0"
              variant={"ghost"}
              size={"icon"}
              onClick={searchHandler}
            >
              <Search />
            </Button>
          </div>
        </div>
      </div>

      <ToolbarDatepicker
        onApply={(date) => {
          updateQuery("from", date.from);
          updateQuery("to", date.to);
        }}
        date={{ from: queryFilter.from, to: queryFilter.to }}
        setDate={(date) => {
          updateQuery("from", date.from);
          updateQuery("to", date.to);
        }}
      />
    </div>
  );
}
