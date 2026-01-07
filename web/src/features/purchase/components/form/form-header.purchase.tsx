import { UseFormReturn } from "react-hook-form";
import { PurchaseFormValues } from "../../schema/purchase.schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ComboboxWithCreateAction } from "@/components/molecules/combobox/create-new-combobox";
import { useMemo, useState } from "react";

interface Props {
  form: UseFormReturn<PurchaseFormValues>;
  supplierName: string[];
  supplierType: string[];
}
export function FormHeader({ form, supplierName, supplierType }: Props) {
  const supplierNameList = useMemo(() => supplierName, [supplierName]);
  const [nameList, setNameList] = useState<string[]>(supplierNameList);

  const supplierTypeList = useMemo(() => supplierType, [supplierType]);
  const [typeList, setTypeList] = useState<string[]>(supplierTypeList);

  const isSubmitting = form.formState.isSubmitting;
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="purchase_date"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tanggal Pembelian</FormLabel>
            <FormControl>
              <Input
                type="date"
                disabled={isSubmitting}
                value={
                  field.value ? field.value.toISOString().split("T")[0] : ""
                }
                onChange={(e) =>
                  field.onChange(
                    e.target.value ? new Date(e.target.value) : undefined
                  )
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="gap-4 grid grid-cols-2">
        <FormField
          control={form.control}
          name="supplier_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Supplier</FormLabel>
              <FormControl>
                <ComboboxWithCreateAction
                  disabled={isSubmitting}
                  items={nameList}
                  onItemsChange={setNameList}
                  value={field.value}
                  onValueChange={(e) => field.onChange(e)}
                  valuePlaceholder="Cari atau buat nama supplier"
                  placeholder="Cari atau buat nama supplier"
                />
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
                <ComboboxWithCreateAction
                  disabled={isSubmitting}
                  items={typeList}
                  onItemsChange={setTypeList}
                  value={field.value}
                  onValueChange={(e) => field.onChange(e)}
                  valuePlaceholder="Cari atau buat tipe supplier"
                  placeholder="Cari atau buat tipe supplier"
                />
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
              <Textarea
                disabled={isSubmitting}
                placeholder="Ex: Jika ada..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
