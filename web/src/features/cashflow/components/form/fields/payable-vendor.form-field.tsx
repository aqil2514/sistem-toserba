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

export function VendorFormField({ form }: Props) {
  const { addDialog } = useCashflow();
  const { data, isLoading, mutate } = useFetch<string[]>(
    `${SERVER_URL}/cashflow/vendor_name`,
  );

  useEffect(() => {
    mutate?.();
  }, [addDialog, mutate]);

  if (isLoading) return <LoadingSpinner label="Mengambil Data Vendor...." />;

  const exirtVendorName = data ?? [];

  return <VendorField form={form} exirtVendorName={exirtVendorName} />;
}

interface VendorFieldProps extends Props {
  exirtVendorName: string[];
}
const VendorField: React.FC<VendorFieldProps> = ({
  exirtVendorName,
  form,
}) => {
  const [customerName, setCustomerName] = useState<string[]>(exirtVendorName);

  const isSubmitting = form.formState.isSubmitting;
  return (
    <FieldGroup>
      <Controller
        name="payable_vendor_name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Utang ke</FieldLabel>
            <ComboboxWithCreateAction
              items={customerName}
              onValueChange={field.onChange}
              onItemsChange={setCustomerName}
              disabled={isSubmitting}
              placeholder="Cari atau Buat Nama Vendor"
              valuePlaceholder="Cari Nama Vendor"
              value={field.value ?? ""}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};
