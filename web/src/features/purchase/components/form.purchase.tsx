"use client";

import { useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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

import { purchaseSchema, PurchaseFormValues } from "../schema/purchase.schema";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ProductInput,
  ProductOption,
} from "@/components/molecules/product-input";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: PurchaseFormValues) => void;
  mode: "demo" | "private";
  products?: ProductOption[];
}

const EMPTY_VALUES: PurchaseFormValues = {
  purchase_date: undefined,
  purchase_code: "",
  supplier_name: "",
  supplier_type: "",
  notes: "",
  items: [],
};

export function PurchaseFormDialog({
  open,
  onOpenChange,
  onSubmit,
  mode,
  products,
}: Props) {
  const form = useForm<PurchaseFormValues>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: EMPTY_VALUES,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  useEffect(() => {
    if (open) {
      form.reset(EMPTY_VALUES);
    }
  }, [open, form]);

  const items = useWatch({
    control: form.control,
    name: "items",
  });

  const total = (items ?? []).reduce(
    (sum, item) => sum + (item?.price ?? 0) * (item?.quantity ?? 0),
    0
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-3xl"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Tambah Barang Masuk</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const target = e.target as HTMLElement;
                if (target.getAttribute("role") === "combobox") {
                  e.preventDefault();
                }
              }
            }}
            className="space-y-6"
          >
            <ScrollArea className="h-96 pr-4">
              {/* ================= HEADER ================= */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="purchase_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kode Pembelian</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled
                          placeholder="Otomatis oleh sistem"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="purchase_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={
                            field.value
                              ? field.value.toISOString().split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? new Date(e.target.value)
                                : undefined
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="supplier_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supplier</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Opsional" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="supplier_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipe Supplier</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Opsional" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catatan</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Opsional" />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* ================= ITEMS ================= */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Daftar Barang</h3>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      append({
                        product_id: "",
                        quantity: 1,
                        price: 0,
                      })
                    }
                  >
                    Tambah Item
                  </Button>
                </div>

                {fields.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Belum ada item
                  </p>
                )}

                {fields.length > 0 && (
                  <Tabs defaultValue={`item-0`} className="w-full">
                    <TabsList className="flex flex-wrap">
                      {fields.map((field, index) => (
                        <TabsTrigger key={field.id} value={`item-${index}`}>
                          Barang {index + 1}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {fields.map((field, index) => (
                      <TabsContent
                        key={field.id}
                        value={`item-${index}`}
                        className="border rounded-md p-4 mt-4 space-y-4"
                      >
                        {/* ===== PRODUK ===== */}
                        <FormField
                          control={form.control}
                          name={`items.${index}.product_id`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Produk</FormLabel>
                              <FormControl>
                                <ProductInput
                                  mode={mode}
                                  value={field.value}
                                  onChange={field.onChange}
                                  products={products}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          {/* ===== JUMLAH ===== */}
                          <FormField
                            control={form.control}
                            name={`items.${index}.quantity`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Jumlah</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    value={field.value}
                                    onChange={(e) =>
                                      field.onChange(Number(e.target.value))
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* ===== HARGA BELI ===== */}
                          <FormField
                            control={form.control}
                            name={`items.${index}.price`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Harga Beli</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    value={field.value}
                                    onChange={(e) =>
                                      field.onChange(Number(e.target.value))
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* ===== INFO HPP (READ ONLY) ===== */}
                        <div className="rounded-md bg-muted/50 p-3 text-sm">
                          <p className="font-medium">Informasi HPP</p>

                          <p className="text-muted-foreground">
                            HPP :
                            <span className="font-semibold text-foreground">
                              {formatRupiah(items?.[index]?.price ?? 0)}
                            </span>
                          </p>
                        </div>

                        {/* ===== ACTION ===== */}
                        <div className="flex justify-end">
                          <Button
                            type="button"
                            variant="ghost"
                            className="text-destructive"
                            onClick={() => remove(index)}
                          >
                            Hapus Barang Ini
                          </Button>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                )}
              </div>
            </ScrollArea>
            {/* ================= ACTIONS ================= */}
            <div className="grid lg:grid-cols-2 gap-4">
              <div className="rounded-md border bg-muted/50 p-4 flex items-center justify-between">
                <span className="text-sm font-medium">Total Pembelian</span>
                <span className="text-lg font-semibold">
                  {formatRupiah(total)}
                </span>
              </div>
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
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
