import { FormFieldArrayTabs } from "@/components/forms/field-array-tabs.form";
import { FormFieldCurrency } from "@/components/forms/field-currency.form";
import { FormFieldNumber } from "@/components/forms/field-number.form";
import { FormFieldText } from "@/components/forms/field-text.form";
import { Separator } from "@/components/ui/separator";
import { defaultPurchaseConsumable } from "@/features/purchase/schema/items/purchase-consumables.schema";
import { PurchaseFormValues } from "@/features/purchase/schema/purchase.schema";
import { formatRupiah } from "@/utils/format-to-rupiah";
import React, { useMemo } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";

interface Props {
  form: UseFormReturn<PurchaseFormValues>;
}

export function FormPurchaseConsumables({ form }: Props) {
  return (
    <FormFieldArrayTabs
      defaultItem={defaultPurchaseConsumable}
      form={form}
      formComponent={(form, index) => (
        <FormComponent form={form} index={index} />
      )}
      name="items"
      title="Perlengkapan Toko yang dibeli"
    />
  );
}

interface FormComponentProps extends Props {
  index: number;
}
const FormComponent: React.FC<FormComponentProps> = ({ form, index }) => {
  const unitAmount = useWatch({
    control: form.control,
    name: `items.${index}.quantity`,
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
        label="Nama Perlengkapan Toko"
        name={`items.${index}.consumable_name`}
        placeholder="Misal : Kulkas"
      />
      <div className="grid grid-cols-2 gap-4">
        <FormFieldNumber
          form={form}
          label="Jumlah Kuantitas"
          name={`items.${index}.quantity`}
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
    </div>
  );
};
