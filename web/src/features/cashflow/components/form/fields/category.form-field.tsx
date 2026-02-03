import { LabelValue } from "@/@types/general";
import { ComboboxWithCreateAction } from "@/components/molecules/combobox/create-new-combobox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SERVER_URL } from "@/constants/url";
import { CashflowSchemaType } from "@/features/cashflow/schema/cashflow.schema";
import { useCashflow } from "@/features/cashflow/store/provider.cashflow";
import {
  CashflowCategoryDb,
  CashflowCategoryStatus,
} from "@/features/cashflow/types/cashflow-category.types";
import { useFetch } from "@/hooks/use-fetch";
import React, { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<CashflowSchemaType>;
}

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
  const { addDialog } = useCashflow();
  const { data, isLoading, mutate } = useFetch<CashflowCategoryDb[]>(
    `${SERVER_URL}/cashflow/categories`,
  );

  useEffect(() => {
    if (addDialog) mutate?.();
  }, [addDialog, mutate]);

  if (isLoading) return <LoadingSpinner label="Mengambil Data Category...." />;

  const existCategories = data?.map((d) => d.name) ?? [];

  return (
    <div className="grid grid-cols-2 gap-4">
      <CategoryName form={form} existCategories={existCategories} />
      <StatusCashflow form={form} />
    </div>
  );
}

type CategoryNameProps = Props & {
  existCategories: string[];
};

const CategoryName: React.FC<CategoryNameProps> = ({
  form,
  existCategories,
}) => {
  const [categories, setCategories] = useState<string[]>(existCategories);

  const isSubmitting = form.formState.isSubmitting;
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
              disabled={isSubmitting}
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
  const isSubmitting = form.formState.isSubmitting;
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
              disabled={isSubmitting}
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
