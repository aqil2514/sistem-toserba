import { FormFieldComboboxAction } from "@/components/forms/field-combobox-action.form";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SERVER_URL } from "@/constants/url";
import { CashflowSchemaType } from "@/features/cashflow/schema/cashflow.schema";
import { useCashflow } from "@/features/cashflow/store/provider.cashflow";
import { useFetch } from "@/hooks/use-fetch";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

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

  const existVendorName = data ?? [];

  return (
    <FormFieldComboboxAction
      form={form}
      options={existVendorName}
      label="Utang ke"
      name="payable_vendor_name"
      placeholder="Cari atau Buat Nama Vendor"
    />
  );
}
