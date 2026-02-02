import { LabelValue } from "@/@types/general";
import { ComboboxWithCreateAction } from "@/components/molecules/combobox/create-new-combobox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CashflowSchemaType } from "@/features/cashflow/schema/cashflow.schema";
import { CashflowCategoryStatus } from "@/features/cashflow/types/cashflow-category.types";
import React, { useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<CashflowSchemaType>;
}

const dummycategory: string[] = [
  "Kategori 1",
  "Kategori 2",
  "Kategori 3",
  "Kategori 4",
  "Kategori 5",
];

const cashflowStatus: LabelValue<CashflowCategoryStatus>[] = [
  {
    label: "Pengeluaran",
    value: "expense",
  },
  {
    label: "Pemasukan",
    value: "income",
  },
  {
    label: "Pindah Aset",
    value: "transfer",
  },
];

export function CasfhlowCategoryField({ form }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <CategoryName form={form} />
      <StatusCashflow form={form} />
    </div>
  );
}

const CategoryName: React.FC<Props> = ({ form }) => {
  const [categories, setCategories] = useState<string[]>(dummycategory);
  return (
    <FieldGroup>
      <Controller
        name="category.name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Kategori</FieldLabel>
            <ComboboxWithCreateAction
              items={categories}
              onValueChange={field.onChange}
              onItemsChange={setCategories}
              value={field.value}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};

const StatusCashflow: React.FC<Props> = ({ form }) => {
  return (
    <FieldGroup>
      <Controller
        name="category.status"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Status Cashflow</FieldLabel>
            <Select
              value={field.value}
              onValueChange={(value: CashflowCategoryStatus) =>
                field.onChange(value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status Cashflow" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {cashflowStatus.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};
