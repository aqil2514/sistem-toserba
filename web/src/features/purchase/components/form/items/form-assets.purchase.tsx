import { FormFieldArrayTabs } from "@/components/forms/field-array-tabs.form";
import { FormFieldCurrency } from "@/components/forms/field-currency.form";
import { FormFieldNumber } from "@/components/forms/field-number.form";
import { FormFieldSelect } from "@/components/forms/field-select.form";
import { FormFieldText } from "@/components/forms/field-text.form";
import { Separator } from "@/components/ui/separator";
import { assetConditionOptions } from "@/features/purchase/constants/purchase-asset-condition";
import { defaultPurchaseAsset } from "@/features/purchase/schema/items/purchase-assets.schema";
import { PurchaseFormValues } from "@/features/purchase/schema/purchase.schema";
import { formatRupiah } from "@/utils/format-to-rupiah";
import React, { useMemo } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";

interface Props {
  form: UseFormReturn<PurchaseFormValues>;
}

export function FormPurchaseAssets({ form }: Props) {
  return (
    <FormFieldArrayTabs
      defaultItem={defaultPurchaseAsset}
      form={form}
      formComponent={(form, index) => (
        <FormComponent form={form} index={index} />
      )}
      name="items"
      title="Aset yang dibeli"
    />
  );
}

interface FormComponentProps extends Props {
  index: number;
}
const FormComponent: React.FC<FormComponentProps> = ({ form, index }) => {
  const unitAmount = useWatch({
    control: form.control,
    name: `items.${index}.unit_count`,
  });
  const unitPrice = useWatch({
    control: form.control,
    name: `items.${index}.unit_price`,
  });

  const totalPrice = useMemo(
    () => unitAmount * unitPrice,
    [unitAmount, unitPrice],
  );

  return (
    <div className="space-y-4">
      <FormFieldText
        form={form}
        label="Nama Aset"
        name={`items.${index}.asset_name`}
        placeholder="Misal : Kulkas"
      />
      <div className="grid grid-cols-2 gap-4">
        <FormFieldNumber
          form={form}
          label="Jumlah Unit"
          name={`items.${index}.unit_count`}
          placeholder="Misal : 2"
        />
        <FormFieldCurrency
          form={form}
          label="Harga Perunit"
          name={`items.${index}.unit_price`}
          placeholder="Misal : Rp. 1000"
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Total Harga :{" "}
        <span className="font-semibold text-foreground">
          {formatRupiah(totalPrice)}
        </span>
        <span className="mx-1.5 text-xs">
          ({unitAmount} pcs × {formatRupiah(unitPrice)})
        </span>
      </p>
      <Separator />
      <FormFieldSelect
        form={form}
        label="Kondisi Aset"
        name={`items.${index}.condition`}
        options={assetConditionOptions}
      />
    </div>
  );
};
