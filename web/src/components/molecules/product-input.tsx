"use client";

import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { TemplateMode } from "@/@types/general";

const STORAGE_KEY = "toserba-demo-products";

export interface ProductOption {
  id: string;
  name: string;
  unit?: string;
}

interface Props {
  mode: TemplateMode;
  value: string;
  onChange: (value: string) => void;
  products?: ProductOption[]; // private
  placeholder?: string;
}

export function ProductInput({
  mode,
  value,
  onChange,
  products = [],
  placeholder = "Ketik nama produk",
}: Props) {
  const options: ProductOption[] = useMemo(() => {
    if (mode === "demo") {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      try {
        return JSON.parse(raw);
      } catch {
        return [];
      }
    }
    return products;
  }, [mode, products]);

  const selectedValue = useMemo(() => {
    return products.find((prod) => prod.id === value);
  }, [value, products]);

  return (
    <div className="space-y-1">
      {/* INPUT */}
      <div className="relative">
        <Input
          list="product-options"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            selectedValue && "pr-10 border-green-500 focus-visible:ring-green-500"
          )}
        />

        {/* CHECK ICON */}
        {selectedValue && (
          <Check className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600" />
        )}
      </div>

      {/* HELPER TEXT */}
      <p className="text-xs text-muted-foreground">
        Ketik atau pilih produk dari daftar
      </p>

      {/* SELECTED PREVIEW */}
      {selectedValue && (
        <p className="text-xs text-green-600">
          ✓ {selectedValue.name}
          {selectedValue.unit ? ` • ${selectedValue.unit}` : ""}
        </p>
      )}

      {/* DATALIST */}
      <datalist id="product-options">
        {options.map((p) => (
          <option
            key={p.id}
            value={p.id}
            label={`${p.name}${p.unit ? ` (${p.unit})` : ""}`}
          />
        ))}
      </datalist>
    </div>
  );
}
