import { useForm } from "react-hook-form";
import { ProductFormValues, productSchema } from "../../schema/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CurrencyInputID } from "@/components/ui/currency-input-id";
import { useProducts } from "../../store/provider.products";
import { useMemo, useState } from "react";
import { ComboboxWithCreateAction } from "@/components/molecules/combobox/create-new-combobox";

const EMPTY_VALUES: ProductFormValues = {
  name: "",
  price: 0,
  category: "",
  subcategory: "",
  unit: "pcs",
};

interface Props {
  onSubmit: (values: ProductFormValues) => Promise<void> | void;
  defaultValues?: ProductFormValues;
}

export function ProductForm({ onSubmit, defaultValues }: Props) {
  const { data } = useProducts();
  const uniqueCategory = useMemo(() => {
    if (!data) return [];

    const uniqueCategory = new Set<string>(
      data.map((item) => item.category).sort()
    );

    return Array.from(uniqueCategory);
  }, [data]);

  const uniqueSubCategory = useMemo(() => {
    if (!data) return [];

    const uniqueItems = new Set<string>(
      data.map((item) => item.subcategory ?? "").sort()
    );

    return Array.from(uniqueItems);
  }, [data]);

  const [categoryItems, setCategoryItems] = useState<string[]>(uniqueCategory);
  const [subCategoryItems, setSubCategoryItems] =
    useState<string[]>(uniqueSubCategory);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues ?? EMPTY_VALUES,
  });

  const isSubmitting = form.formState.isSubmitting;

  const submitHandler = async (values: ProductFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Produk</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nama Produk"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Harga Produk</FormLabel>
                <FormControl>
                  <CurrencyInputID
                    onValueChange={(e) => field.onChange(e)}
                    value={field.value}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Satuan</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Misal : pcs, botol, liter, dsb..."
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori</FormLabel>
                <FormControl>
                  <ComboboxWithCreateAction
                    items={categoryItems}
                    onItemsChange={setCategoryItems}
                    onValueChange={(e) => field.onChange(e)}
                    value={field.value}
                    placeholder="Cari atau buat kategori baru"
                    valuePlaceholder="Cari atau buat kategori baru"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subcategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub Kategori</FormLabel>
                <FormControl>
                  <ComboboxWithCreateAction
                    items={subCategoryItems}
                    onItemsChange={setSubCategoryItems}
                    onValueChange={(e) => field.onChange(e)}
                    value={field.value ?? ""}
                    placeholder="Cari atau buat sub kategori baru"
                    valuePlaceholder="Cari atau buat sub kategori baru"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Menyimpan..." : "Simpan"}
        </Button>
      </form>
    </Form>
  );
}
