import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  ArrowUpDown,
  CalendarFold,
  Coins,
  CreditCard,
  HandCoins,
  SortAsc,
  SortDesc,
  User,
} from "lucide-react";
import { ToggleSortKey } from "../types/query";
import { useSales } from "../store/sales.provider";
import { JSX, useState } from "react";

const queryKeys: ToggleSortKey[] = [
  "customer_name",
  "payment_method",
  "sales_code",
  "transaction_at",
  "total_amount",
];

const IconMapper: Record<ToggleSortKey, React.ReactNode> = {
  customer_name: <User />,
  payment_method: <HandCoins />,
  sales_code: <CreditCard />,
  total_amount: <Coins />,
  transaction_at: <CalendarFold />,
};

const queryLabel: Record<ToggleSortKey, string> = {
  customer_name: "Nama Pembeli",
  payment_method: "Metode Pembayaran",
  sales_code: "Kode Penjualan",
  total_amount: "Total Pembelian",
  transaction_at: "Tanggal Pembelian",
};

const triggerIcon: Record<string, JSX.Element> = {
  asc: <SortAsc />,
  desc: <SortDesc />,
};

export function SalesToolbarSorting() {
  const [querySortKey, setQuerySortKey] =
    useState<ToggleSortKey>("customer_name");
  const { query, updateQuery } = useSales();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={query.sortedValue ? "default" : "outline"}
          size={"icon"}
        >
          {query.sortedValue ? (
            <>{triggerIcon[query.sortedValue]}</>
          ) : (
            <ArrowUpDown />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-2">
        <p className="text-gray-500 font-semibold text-sm">Urutkan Data</p>
        <Separator />

        <div className="flex justify-center gap-2">
          {queryKeys.map((queryKey) => (
            <Button
              key={queryKey}
              variant={querySortKey === queryKey ? "default" : "outline"}
              size="icon"
              onClick={() => {
                setQuerySortKey(queryKey);
                updateQuery("sortedKey", queryKey);
              }}
            >
              {IconMapper[queryKey]}
            </Button>
          ))}
        </div>

        <Separator />

        <div className="flex items-center gap-3 rounded-md bg-muted px-3 py-2">
          {IconMapper[querySortKey]}
          <span className="text-sm font-medium">
            {queryLabel[querySortKey]}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1">
          <Button
            variant={query.sortedValue === "asc" ? "default" : "outline"}
            onClick={() => updateQuery("sortedValue", "asc")}
          >
            <SortAsc />
          </Button>
          <Button
            variant={query.sortedValue === "desc" ? "default" : "outline"}
            onClick={() => updateQuery("sortedValue", "desc")}
          >
            <SortDesc />
          </Button>
          <Button
            variant={!query.sortedValue ? "default" : "outline"}
            onClick={() => updateQuery("sortedValue", undefined)}
          >
            <ArrowUpDown />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
