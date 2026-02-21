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
  disabled?: boolean;
}

export function DebtorFormField({ form, disabled }: Props) {
  const { addDialog } = useCashflow();
  const { data, isLoading, mutate } = useFetch<string[]>(
    `${SERVER_URL}/sales/customer_name`,
  );

  useEffect(() => {
    mutate?.();
  }, [addDialog, mutate]);

  if (isLoading) return <LoadingSpinner label="Mengambil Data Pelanggan...." />;

  const existCustomerName = data ?? [];

  return (
    <FormFieldComboboxAction
      form={form}
      label="Pihak yang Berhutang"
      name="receivable_customer_name"
      options={existCustomerName}
      placeholder="Cari atau buat pihak yang berhutang"
      disabled={disabled}
    />
  );
}
