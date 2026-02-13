import { UseFormReturn, useWatch } from "react-hook-form";
import { SalesSchemaType } from "../../../schemas/sales-schema";
import {
  Product,
  ProductStockRpcResponse,
} from "@/features/products/types/type";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useEffect, useMemo } from "react";
import { FormComponent } from "./form-components";
import { FormFieldArrayTabs } from "@/components/forms/field-array-tabs.form";
import { defaultSalesItemSchema } from "@/features/sales/schemas/sales-item-schema";

interface Props {
  form: UseFormReturn<SalesSchemaType>;
  data: Product[] | undefined;
  isLoading: boolean;
  stocks: ProductStockRpcResponse["data"] | undefined;
}

export function SalesItemForm({ form, data, isLoading, stocks }: Props) {
  const items = useWatch({
    control: form.control,
    name: "items",
  });

  const totalPrice = useMemo(() => {
    if (!items) return 0;

    return items.reduce((acc, item) => {
      const price = item.price ?? 0;
      const qty = item.quantity ?? 0;
      const discount = item.discount ?? 0;
      const tip = item.tip ?? 0;

      return acc + price * qty + tip - discount;
    }, 0);
  }, [items]);

  useEffect(() => {
    form.setValue("total_amount", totalPrice, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [totalPrice, form]);

  return (
    <div className="space-y-4 px-1">
      {isLoading ? (
        <LoadingSpinner label="Mengambil data produk..." />
      ) : (
        <FormFieldArrayTabs
          defaultItem={defaultSalesItemSchema}
          form={form}
          formComponent={(form, index) => (
            <FormComponent
              form={form}
              index={index}
              data={data}
              stocks={stocks}
            />
          )}
          name="items"
          title="Daftar Produk"
        />
      )}
    </div>
  );
}
