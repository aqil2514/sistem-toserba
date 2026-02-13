import { UseFormReturn } from "react-hook-form";
import {
  defaultPurchaseItem,
  PurchaseFormValues,
} from "../../schema/purchase.schema";
import { Button } from "@/components/ui/button";
import { PurchaseFormRss } from "../../types/purchase-form-rss";
import React, { useMemo } from "react";
import { LabelValue } from "@/@types/general";
import { FormFieldCombobox } from "@/components/forms/field-combobox.form";
import { FormFieldNumber } from "@/components/forms/field-number.form";
import { FormFieldCurrency } from "@/components/forms/field-currency.form";
import { FormFieldArrayTabs } from "@/components/forms/array-tabs/field-array.form";

interface Props {
  form: UseFormReturn<PurchaseFormValues>;
  productList: PurchaseFormRss["products"];
  setAddNewProduct: React.Dispatch<React.SetStateAction<boolean>>;
}

export function FormPurchaseItem({
  form,
  productList,
  setAddNewProduct,
}: Props) {
  const list: LabelValue[] = useMemo(() => {
    return productList
      .map((product) => ({
        label: product.name,
        value: product.id,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [productList]);

  return (
    <FormFieldArrayTabs
      form={form}
      defaultItem={defaultPurchaseItem}
      name="items"
      title="Barang yang Dibeli"
      formComponent={(form, index) => (
        <FormComponent
          form={form}
          index={index}
          list={list}
          setAddNewProduct={setAddNewProduct}
        />
      )}
    />
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
