import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table } from "@tanstack/react-table";
import React from "react";

interface Props<TData> {
  searchKey: keyof TData | undefined;
  categoryKey: keyof TData | undefined;

  data: TData[];

  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;

  table: Table<TData>;
}

export function ToolbarTable<TData>({
  searchKey,
  globalFilter,
  setGlobalFilter,
  categoryKey,
  data,
  table,
}: Props<TData>) {
  const categories = React.useMemo(() => {
    if (!categoryKey) return [];
    return Array.from(
      new Set(data.map((item) => item[categoryKey]).filter(Boolean))
    );
  }, [data, categoryKey]);

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      {/* Search */}
      {searchKey && (
        <Input
          placeholder="Cari produk..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="md:max-w-xs"
        />
      )}

      {/* Category Filter */}
      {categoryKey && (
        <Select
          value={
            (table
              .getColumn(categoryKey as string)
              ?.getFilterValue() as string) ?? "all"
          }
          onValueChange={(value) =>
            table
              .getColumn(categoryKey as string)
              ?.setFilterValue(value === "all" ? undefined : value)
          }
        >
          <SelectTrigger className="md:max-w-xs">
            <SelectValue placeholder="Filter kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kategori</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={String(cat)} value={String(cat)}>
                {String(cat)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
