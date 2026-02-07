import { ComboboxWithCreateAction } from "@/components/molecules/combobox/create-new-combobox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SERVER_URL } from "@/constants/url";
import { CashflowSchemaType } from "@/features/cashflow/schema/cashflow.schema";
import { useCashflow } from "@/features/cashflow/store/provider.cashflow";
import { useFetch } from "@/hooks/use-fetch";
import React, { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<CashflowSchemaType>;
}

export function DebtorFormField({ form }: Props) {
  const { addDialog } = useCashflow();
  const { data, isLoading, mutate } = useFetch<string[]>(
    `${SERVER_URL}/sales/customer_name`,
  );

  useEffect(() => {
    mutate?.();
  }, [addDialog, mutate]);

  if (isLoading) return <LoadingSpinner label="Mengambil Data Pelanggan...." />;

  const existCustomerName = data ?? [];

  return <DebtorField form={form} existCustomerName={existCustomerName} />;
}

interface DebtorFieldProps extends Props {
  existCustomerName: string[];
}
const DebtorField: React.FC<DebtorFieldProps> = ({
  existCustomerName,
  form,
}) => {
  const [customerName, setCustomerName] = useState<string[]>(existCustomerName);

  const isSubmitting = form.formState.isSubmitting;
  return (
    <FieldGroup>
      <Controller
        name="receivable_customer_name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Pihak yang Behutang</FieldLabel>
            <ComboboxWithCreateAction
              items={customerName}
              onValueChange={field.onChange}
              onItemsChange={setCustomerName}
              disabled={isSubmitting}
              placeholder="Cari atau Buat Nama Pembeli"
              valuePlaceholder="Cari Nama Pembeli"
              value={field.value ?? ""}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};
