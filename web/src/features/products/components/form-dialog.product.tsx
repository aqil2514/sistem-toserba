"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { productSchema, ProductFormValues } from "../schema/product.schema";
import { CurrencyInputID } from "@/components/ui/currency-input-id";
import { CategoryCombobox } from "./category-combobox.product";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: ProductFormValues;
  onSubmit: (values: ProductFormValues) => void;
  title: string;
  categories: string[];
  subcategoriesMap: Map<string, Set<string>>;
}

const EMPTY_VALUES: ProductFormValues = {
  name: "",
  price: 0,
  category: "",
  subcategory: "",
  unit: "pcs",
};

export function ProductFormDialog({
  open,
  onOpenChange,
  defaultValues,
  onSubmit,
  title,
  categories,
  subcategoriesMap,
}: Props) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: EMPTY_VALUES,
  });

  const selectedCategory = useWatch({
    control: form.control,
    name: "category",
  });

  // 🔑 INI KUNCINYA
  useEffect(() => {
    if (open) {
      form.reset(defaultValues ?? EMPTY_VALUES);
    }
  }, [open, defaultValues, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Produk</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harga</FormLabel>
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <FormControl>
                    <CategoryCombobox
                      value={field.value}
                      options={categories}
                      placeholder="Pilih atau ketik kategori"
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subcategory"
              render={({ field }) => {
                const subs =
                  selectedCategory && subcategoriesMap.get(selectedCategory)
                    ? Array.from(subcategoriesMap.get(selectedCategory)!)
                    : [];

                return (
                  <FormItem>
                    <FormLabel>Subkategori</FormLabel>
                    <FormControl>
                      <CategoryCombobox
                        value={field.value}
                        options={subs}
                        placeholder="Pilih atau ketik subkategori"
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Satuan</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
              >
                Batal
              </Button>
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
