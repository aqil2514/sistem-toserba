"use client";

import CurrencyInput from "react-currency-input-field";
import { cn } from "@/lib/utils";

interface CurrencyInputIDProps {
  value?: number;
  onValueChange?: (value: number | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function CurrencyInputID({
  value,
  onValueChange,
  placeholder = "Rp 0",
  disabled,
  className,
}: CurrencyInputIDProps) {
  return (
    <CurrencyInput
      value={value}
      onValueChange={(value) =>
        onValueChange?.(
          value ? Number(value) : undefined
        )
      }
      placeholder={placeholder}
      disabled={disabled}
      intlConfig={{ locale: "id-ID", currency: "IDR" }}
      decimalsLimit={0}
      allowNegativeValue={false}
      groupSeparator="."
      decimalSeparator=","
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
        "ring-offset-background placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    />
  );
}
