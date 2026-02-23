import { UseFormReturn } from "react-hook-form";
import { PurchaseFormValues } from "../../../schema/purchase.schema";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { LabelValue } from "@/@types/general";
import { FormFieldCombobox } from "@/components/forms/field-combobox.form";
import { FormFieldNumber } from "@/components/forms/field-number.form";
import { FormFieldCurrency } from "@/components/forms/field-currency.form";
import { FormFieldArrayTabs } from "@/components/forms/field-array-tabs.form";
import { defaultPurchaseItem } from "../../../schema/items/purchase-items.schema";
import { useProductName } from "@/hooks/view-table/use-product-name";
import { AddProductFormPurchaseDialog } from "../../dialog/add/dialog-add-product.purchase";

interface Props {
  form: UseFormReturn<PurchaseFormValues>;
}

export function FormPurchaseItem({ form }: Props) {
  const { productNameLabelValue, mutate } = useProductName();
  const [addNewProduct, setAddNewProduct] = useState<boolean>(false);

  return (
    <>
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
    </>
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
    </>
  );
};
