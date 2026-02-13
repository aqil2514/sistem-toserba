import { UseFormReturn } from "react-hook-form";
import { PurchaseFormValues } from "../../schema/purchase.schema";
import { FormFieldDatePicker } from "@/components/forms/field-date-picker.form";
import { FormFieldComboboxAction } from "@/components/forms/field-combobox-action.form";
import { FormFieldTextArea } from "@/components/forms/field-textarea.form";

interface Props {
  form: UseFormReturn<PurchaseFormValues>;
  supplierName: string[];
  supplierType: string[];
}

export function FormHeader({ form, supplierName, supplierType }: Props) {
  return (
    <div className="space-y-4">
      <FormFieldDatePicker
        form={form}
        label="Tanggal Pembelian"
        name="purchase_date"
        placeholder="Pilih tanggal pembelian"
      />
      <div className="gap-4 grid md:grid-cols-2">
        <FormFieldComboboxAction
          form={form}
          name="supplier_name"
          label="Nama Supplier"
          options={supplierName}
          placeholder="Cari atau buat nama supplier"
        />

        <FormFieldComboboxAction
          form={form}
          name="supplier_type"
          label="Tipe Supplier"
          options={supplierType}
          placeholder="Cari atau buat tipe supplier"
        />
      </div>

      <FormFieldTextArea
        form={form}
        label="Catatan"
        name="notes"
        placeholder="Contoh : Diskon"
      />
    </div>
  );
}
