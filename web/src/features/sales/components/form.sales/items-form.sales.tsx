import { useFieldArray, UseFormReturn, useWatch } from "react-hook-form";
import { SalesSchemaType } from "../../schemas/sales-schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Product, ProductStockRpcResponse } from "@/features/products/type";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useEffect, useMemo } from "react";
import { Combobox } from "@/components/molecules/combobox";
import { Input } from "@/components/ui/input";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { CurrencyInputID } from "@/components/ui/currency-input-id";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { defaultSalesItemSchema } from "../../schemas/sales-item-schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Props {
  form: UseFormReturn<SalesSchemaType>;
  data: Product[] | undefined;
  isLoading: boolean;
  stocks: ProductStockRpcResponse["data"] | undefined;
}

export function SalesItemForm({ form, data, isLoading, stocks }: Props) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

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

  const productStockMap = useMemo(() => {
    if (!stocks) return {};

    return Object.fromEntries(
      stocks.map((p) => [p.product_id, p.remaining_quantity])
    );
  }, [stocks]);

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
      {isLoading && <LoadingSpinner label="Mengambil data produk..." />}
      <Tabs defaultValue={fields[0].id}>
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <TabsList>
            {fields.map((field, index) => (
              <TabsTrigger key={field.id} value={field.id} className="px-3">
                {index + 1}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        {fields.map((field, index) => {
          return (
            <TabsContent key={field.id} value={field.id}>
              <div key={field.id} className="space-y-4">
                <p className="font-semibold text-gray-500 text-lg">
                  Produk {index + 1}
                </p>
                <FormField
                  control={form.control}
                  name={`items.${index}.product_id`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Produk</FormLabel>
                      <FormControl>
                        <Combobox
                          data={products}
                          getLabel={(p) => {
                            const price = productPriceMap[p.value] ?? 0;
                            const stock = productStockMap[p.value] ?? 0;

                            return (
                              <div className="space-y-1">
                                <p className="text-gray-500 font-bold">
                                  {p.label}
                                </p>
                                <p className="text-muted-foreground">
                                  {formatRupiah(price)} | ({stock} pcs)
                                </p>
                              </div>
                            );
                          }}
                          value={field.value}
                          onValueChange={(productId) => {
                            field.onChange(productId);

                            const price = productPriceMap[productId];
                            if (price) {
                              form.setValue(`items.${index}.price`, price, {
                                shouldDirty: true,
                              });
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`items.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Harga</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          disabled
                          readOnly
                          value={formatRupiah(field.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Kuantitas + Diskon + Tip  */}
                <div className="grid md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name={`items.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kuantitas</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`items.${index}.discount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diskon</FormLabel>
                        <FormControl>
                          <CurrencyInputID
                            value={field.value}
                            onValueChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`items.${index}.tip`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tip</FormLabel>
                        <FormControl>
                          <CurrencyInputID
                            value={field.value}
                            onValueChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-4">
                  {fields.length > 1 && (
                    <Button
                      onClick={() => remove(index)}
                      type="button"
                      variant={"destructive"}
                      size={"icon-sm"}
                    >
                      <Trash />
                    </Button>
                  )}
                  <Button
                    onClick={() => append({ ...defaultSalesItemSchema })}
                    type="button"
                    variant={"outline"}
                    size={"icon-sm"}
                  >
                    <Plus />
                  </Button>
                </div>
                <Separator />
                <div></div>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
