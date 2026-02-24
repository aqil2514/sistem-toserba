import { UseFormReturn, useWatch } from "react-hook-form";
import { PurchaseFormValues } from "../../../schema/purchase.schema";
import { Button } from "@/components/ui/button";
import React, { useMemo, useState } from "react";
import { LabelValue } from "@/@types/general";
import { FormFieldCombobox } from "@/components/forms/field-combobox.form";
import { FormFieldNumber } from "@/components/forms/field-number.form";
import { FormFieldCurrency } from "@/components/forms/field-currency.form";
import { FormFieldArrayTabs } from "@/components/forms/field-array-tabs.form";
import { defaultPurchaseItem } from "../../../schema/items/purchase-items.schema";
import { useProductName } from "@/hooks/view-table/use-product-name";
import { AddProductFormPurchaseDialog } from "../../dialog/add/dialog-add-product.purchase";
import { Separator } from "@/components/ui/separator";
import { formatRupiah } from "@/utils/format-to-rupiah";

interface Props {
  form: UseFormReturn<PurchaseFormValues>;
}

export function FormPurchaseItem({ form }: Props) {
  const { productNameLabelValue, mutate } = useProductName();
  const [addNewProduct, setAddNewProduct] = useState<boolean>(false);

  const items = useWatch({
    control: form.control,
    name: "items",
  });

  const totalPrice = useMemo<number>(() => {
    if (!items) return 0;

    return items.reduce((acc, curr) => acc + curr.price, 0);
  }, [items]);

  return (
    <div className="space-y-4">
      <FormFieldArrayTabs
        form={form}
        defaultItem={defaultPurchaseItem}
        name="items"
        title="Barang yang Dibeli"
        formComponent={(form, index) => (
          <FormComponent
            form={form}
            index={index}
            list={productNameLabelValue}
            setAddNewProduct={setAddNewProduct}
          />
        )}
      />

      <AddProductFormPurchaseDialog
        addNewProduct={addNewProduct}
        mutate={mutate}
        setAddNewProduct={setAddNewProduct}
      />

      <Separator />
      <p className="text-sm text-muted-foreground">
        Total Belanja :{" "}
        <span className="font-semibold text-foreground">
          {formatRupiah(totalPrice)}
        </span>
        <span className="mx-1.5 text-xs">
          dari {items?.length} jenis barang
        </span>
      </p>
    </div>
  );
}

interface FormComponentProps {
  form: UseFormReturn<PurchaseFormValues>;
  index: number;
  list: LabelValue<string>[];
  setAddNewProduct: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormComponent: React.FC<FormComponentProps> = ({
  form,
  index,
  list,
  setAddNewProduct,
}) => {
  const quantity = useWatch({
    control: form.control,
    name: `items.${index}.quantity`,
  });

  const price = useWatch({
    control: form.control,
    name: `items.${index}.price`,
  });

  const hpp = useMemo(() => price / quantity, [price, quantity]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <FormFieldCombobox
          form={form}
          label="Nama Produk"
          name={`items.${index}.product_id`}
          options={list}
        />

        <FormFieldNumber
          form={form}
          label="Kuantiti"
          name={`items.${index}.quantity`}
          placeholder="Contoh : 1"
        />
      </div>

      <FormFieldCurrency
        form={form}
        label="Harga"
        name={`items.${index}.price`}
        placeholder="Contoh : Rp. 1.000"
        withCalculator
      />

      <div className="flex gap-4">
        <Button
          type="button"
          variant={"outline"}
          onClick={() => setAddNewProduct(true)}
        >
          Produk Baru
        </Button>
      </div>
      <p className="text-sm text-end text-muted-foreground">
        HPP :{" "}
        <span className="font-semibold text-foreground">
          {formatRupiah(hpp)}
        </span>
      </p>
    </>
  );
};
