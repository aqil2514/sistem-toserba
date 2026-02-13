import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { CurrencyInputID } from "../ui/currency-input-id";
import { Button } from "../ui/button";
import { Calculator } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover";
import { Separator } from "../ui/separator";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { toast } from "sonner";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;

  withCalculator?: boolean;
}

export function FormFieldCurrency<T extends FieldValues>({
  form,
  name,
  label,
  placeholder = "Contoh : Rp. 10.000",
  disabled,
  withCalculator,
}: Props<T>) {
  const isSubmitting = form.formState.isSubmitting;
  return (
    <FieldGroup>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <div className="relative">
              <CurrencyInputID
                {...field}
                id={field.name}
                value={field.value}
                onValueChange={(val) => {
                  if (!val) return;
                  field.onChange(val);
                }}
                aria-invalid={fieldState.invalid}
                placeholder={placeholder}
                disabled={disabled || isSubmitting}
              />
              {withCalculator && (
                <CalculatorPopover onApply={(val) => field.onChange(val)} />
              )}
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}

interface CalculatorPopoverProps {
  onApply: (value: number) => void;
}
const CalculatorPopover: React.FC<CalculatorPopoverProps> = ({ onApply }) => {
  const [expression, setExpression] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCalculate = () => {
    try {
      if (!/^[0-9+\-*/().\s]+$/.test(expression)) return;

      const result = Function(`"use strict"; return (${expression})`)();

      if (typeof result === "number" && !isNaN(result)) {
        onApply(result);
        setIsOpen(false);
        setExpression("");
        toast.success("Berhasil dihitung")
      }
    } catch {
      // ignore invalid expression
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size={"icon-sm"}
          type="button"
          className="absolute right-1 top-1"
        >
          <Calculator />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-2">
        <PopoverHeader>
          <PopoverTitle>Kalkulator</PopoverTitle>
          <PopoverDescription>Hitung cepat di sini</PopoverDescription>
          <Separator />
        </PopoverHeader>

        <Input
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") return handleCalculate();
          }}
          placeholder="Contoh: 10000+25000"
          className="w-full border rounded px-2 py-1 text-sm"
        />

        <Button
          className="w-full"
          variant={"outline"}
          type="button"
          onClick={handleCalculate}
        >
          Hitung
        </Button>
      </PopoverContent>
    </Popover>
  );
};
