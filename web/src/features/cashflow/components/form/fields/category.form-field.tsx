import { LabelValue } from "@/@types/general";
import { FormFieldComboboxAction } from "@/components/forms/field-combobox-action.form";
import { FormFieldSelect } from "@/components/forms/field-select.form";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SERVER_URL } from "@/constants/url";
import { CashflowSchemaType } from "@/features/cashflow/schema/cashflow.schema";
import { useCashflow } from "@/features/cashflow/store/provider.cashflow";
import { CashflowCategoryDb } from "@/features/cashflow/types/cashflow-category.types";
import { CashflowCategoryStatus } from "@/features/cashflow/types/cashflow.types";
import { useFetch } from "@/hooks/use-fetch";
import { useEffect } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";

interface Props {
  form: UseFormReturn<CashflowSchemaType>;
  disabled?: boolean;
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
  {
    label: "Piutang",
    value: "receivable",
  },
  {
    label: "Utang",
    value: "payable",
  },
];

export function CasfhlowCategoryField({ form, disabled }: Props) {
  const { addDialog } = useCashflow();
  const { data, isLoading, mutate } = useFetch<CashflowCategoryDb[]>(
    `${SERVER_URL}/cashflow/categories`,
  );

  useEffect(() => {
    mutate?.();
  }, [addDialog, mutate]);

  const asset = useWatch({
    control: form.control,
    name: "via",
  });

  useEffect(() => {
    if (asset === "Piutang") {
      return form.setValue("category.status", "receivable");
    }
    if (asset === "Utang") {
      return form.setValue("category.status", "payable");
    }
  }, [asset, form]);

  if (isLoading) return <LoadingSpinner label="Mengambil Data Category...." />;

  const existCategories = data?.map((d) => d.name) ?? [];

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <FormFieldComboboxAction
          form={form}
          label="Kategori"
          name="category.name"
          options={existCategories}
          disabled={disabled}
        />
        <FormFieldSelect
          form={form}
          label="Status Cashflow"
          name="category.status"
          options={cashflowStatus}
          disabled={disabled}
          placeholder="Pilih status Cashflow"
        />
      </div>
    </div>
  );
}
