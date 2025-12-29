import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { CreditCard, HandCoins, User } from "lucide-react";
import React, { useState } from "react";

type QueryFilter = "sales_code" | "customer_name" | "payment_method";

const queryKeys: QueryFilter[] = [
  "customer_name",
  "payment_method",
  "sales_code",
];

const IconMapper: Record<QueryFilter, React.ReactNode> = {
  customer_name: <User />,
  payment_method: <HandCoins />,
  sales_code: <CreditCard />,
};

const placeHolderMapper: Record<QueryFilter, string> = {
  customer_name: "Contoh : Budi...",
  payment_method: "Contoh : Cash",
  sales_code: "Contoh : SALE25032....",
};

const queryLabel: Record<QueryFilter, string> = {
  customer_name: "Nama Pembeli",
  payment_method: "Metode Pembayaran",
  sales_code: "Kode Penjualan",
};

export function SalesToolbar() {
  const [query, setQuery] = useState<QueryFilter>("customer_name");
  return (
    <div className="flex gap-2 items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon">
            {IconMapper[query]}
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
                variant={query === queryKey ? "default" : "outline"}
                size="icon"
                onClick={() => setQuery(queryKey)}
              >
                {IconMapper[queryKey]}
              </Button>
            ))}
          </div>

          <Separator />

          <div className="flex items-center gap-3 rounded-md bg-muted px-3 py-2">
            {IconMapper[query]}
            <span className="text-sm font-medium">{queryLabel[query]}</span>
          </div>
        </PopoverContent>
      </Popover>

      <div className="relative flex-1">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {IconMapper[query]}
        </div>

        <Input className="pl-10" placeholder={placeHolderMapper[query]} />
      </div>

      <div>
        Filter Tanggal Transaksi
      </div>
    </div>
  );
}
