import { useFieldArray, UseFormReturn } from "react-hook-form";
import { PurchaseFormValues } from "../../schema/purchase.schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { PurchaseFormRss } from "../../types/purchase-form-rss";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Combobox } from "@/components/molecules/combobox/basic-combobox";
import { useEffect, useMemo, useState } from "react";
import { LabelValue } from "@/@types/general";
import { Input } from "@/components/ui/input";
import { CurrencyInputID } from "@/components/ui/currency-input-id";

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
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const { fields, append, remove } = useFieldArray({
    name: "items",
    control: form.control,
  });

  useEffect(() => {
    if (fields.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab(null);
      return;
    }

    // kalau active tab hilang, fallback ke tab terakhir
    const exists = fields.some((f) => f.id === activeTab);
    if (!exists) {
      setActiveTab(fields[fields.length - 1].id);
    }
  }, [fields, activeTab]);

  const list: LabelValue[] = useMemo(() => {
    return productList
      .map((product) => ({
        label: product.name,
        value: product.id,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [productList]);

  const handleRemove = (index: number) => {
    const next = fields[index - 1]?.id ?? fields[index + 1]?.id ?? null;

    remove(index);
    setActiveTab(next);
  };

  const isSubmitting = form.formState.isSubmitting;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold">Barang yang Dibeli</p>
        <Button
          onClick={() => append({ price: 0, product_id: "", quantity: 1 })}
          size={"icon"}
          disabled={isSubmitting}
          variant={"outline"}
          type="button"
        >
          <Plus />
        </Button>
      </div>
      <Separator />
      <Tabs
        value={activeTab ?? fields[0]?.id}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <TabsList>
            {fields.map((field, i) => (
              <TabsTrigger
                key={field.id}
                value={field.id}
                className="px-3"
                disabled={isSubmitting}
              >
                {i + 1}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {fields.map((field, i) => (
          <TabsContent key={field.id} value={field.id} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`items.${i}.product_id`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Produk</FormLabel>
                    <FormControl>
                      <Combobox
                        data={list}
                        onValueChange={(e) => field.onChange(e)}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`items.${i}.quantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kuantiti</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={isSubmitting}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name={`items.${i}.price`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harga</FormLabel>
                  <FormControl>
                    <CurrencyInputID
                      disabled={isSubmitting}
                      onValueChange={(e) => field.onChange(e)}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => setAddNewProduct(true)}
              >
                Produk Baru
              </Button>

              {fields.length > 1 && (
                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => handleRemove(i)}
                >
                  <Trash />
                </Button>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
