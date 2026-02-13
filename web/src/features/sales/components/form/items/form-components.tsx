import { FormFieldCombobox } from "@/components/forms/field-combobox.form";
import {
  Product,
  ProductStockRpcResponse,
} from "@/features/products/types/type";
import { SalesSchemaType } from "@/features/sales/schemas/sales-schema";
import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { ComboboxProductLabel } from "./combobox-product-label";
import { FormFieldCurrency } from "@/components/forms/field-currency.form";
import { FormFieldNumber } from "@/components/forms/field-number.form";
import { Separator } from "@radix-ui/react-select";

interface Props {
  index: number;
  form: UseFormReturn<SalesSchemaType>;
  data: Product[] | undefined;
  stocks: ProductStockRpcResponse["data"] | undefined;
}
export function FormComponent({ index, form, data, stocks }: Props) {
  const products = useMemo(() => {
    if (!data) return [];

    const products = data.map((prod) => ({
      value: prod.id,
      label: prod.name,
    }));

    return products;
  }, [data]);

  const productPriceMap = useMemo(() => {
    if (!data) return {};

    return Object.fromEntries(data.map((p) => [p.id, p.price]));
  }, [data]);
  return (
    <div className="space-y-4">
      <FormFieldCombobox
        form={form}
        label="Nama Produk"
        name={`items.${index}.product_id`}
        options={products}
        getLabel={(p) => (
          <ComboboxProductLabel p={p} data={data} stocks={stocks} />
        )}
        placeholder="Cari nama produk"
        onValueChange={(productId) => {
          const price = productPriceMap[productId];
          if (price) {
            form.setValue(`items.${index}.price`, price, {
              shouldDirty: true,
            });
          }
        }}
      />

      <FormFieldCurrency
        form={form}
        label="Harga"
        name={`items.${index}.price`}
        placeholder="Otomatis"
        disabled
      />

      {/* Kuantitas + Diskon + Tip  */}
      <div className="grid md:grid-cols-3 gap-4">
        <FormFieldNumber
          form={form}
          label="Kuantitas"
          name={`items.${index}.quantity`}
          placeholder="Misal : 1"
        />

        <FormFieldCurrency
          form={form}
          label="Diskon"
          name={`items.${index}.discount`}
          placeholder="Misal : Rp. 1.000"
          withCalculator
        />

        <FormFieldCurrency
          form={form}
          label="Tip"
          name={`items.${index}.tip`}
          placeholder="Misal : Rp. 1.000"
          withCalculator
        />
      </div>
      <Separator />
      <div></div>
    </div>
  );
}
