"use client";

import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STORAGE_KEY = "toserba-demo-products";

export interface ProductOption {
  id: string;
  name: string;
  unit?: string;
}

interface Props {
  mode: "demo" | "private";
  value: string;
  onChange: (value: string) => void;
  products?: ProductOption[]; // private mode
}

export function ProductSelector({
  mode,
  value,
  onChange,
  products = [],
}: Props) {
  const options: ProductOption[] = useMemo(() => {
    if (mode === "demo") {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];

      try {
        return JSON.parse(raw) as ProductOption[];
      } catch {
        return [];
      }
    }

    return products;
  }, [mode, products]);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Pilih produk" />
      </SelectTrigger>

      <SelectContent>
        {options.map((p) => (
          <SelectItem key={p.id} value={p.id}>
            {p.name}
            {p.unit ? ` (${p.unit})` : ""}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
