import { UseFormReturn } from "react-hook-form";
import { PurchaseFormValues } from "../../schema/purchase.schema";
import { FormFieldDatePicker } from "@/components/forms/field-date-picker.form";
import { FormFieldTextArea } from "@/components/forms/field-textarea.form";
import { FormFieldText } from "@/components/forms/field-text.form";
import { useSupplierName } from "@/hooks/view-table/use-supplier-name";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useSupplierType } from "@/hooks/view-table/use-supplier-type";
import { FormFieldSelect } from "@/components/forms/field-select.form";
import { purchaseTypeOptions } from "../../constants/purchase-type.constants";
import { purchaseStatusOptions } from "../../constants/purchase-status.constants";

interface Props {
  form: UseFormReturn<PurchaseFormValues>;
}

export function FormHeader({ form }: Props) {
  const { supplierNameLabelValue, isLoading: loadingSupplierName } =
    useSupplierName();
  const { supplierTypeLabelValue, isLoading: loadingSupplierType } =
    useSupplierType();

  const isLoading = loadingSupplierName || loadingSupplierType;

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="space-y-4">
      <FormFieldDatePicker
        form={form}
        label="Tanggal Pembelian"
        name="purchase_date"
        placeholder="Pilih tanggal pembelian"
      />
      <div className="gap-4 grid md:grid-cols-2">
        <FormFieldText
          form={form}
          name="supplier_name"
          label="Nama Supplier"
          placeholder="Misal : Sales"
          datalist={supplierNameLabelValue}
        />

        <FormFieldText
          form={form}
          name="supplier_type"
          label="Tipe Supplier"
          placeholder="Misal : Tiktok"
          datalist={supplierTypeLabelValue}
        />

        <FormFieldSelect
          form={form}
          name="purchase_type"
          label="Tipe Pembelian"
          options={purchaseTypeOptions}
        />

        <FormFieldSelect
          form={form}
          name="purchase_status"
          label="Status Pembelian"
          options={purchaseStatusOptions}
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
