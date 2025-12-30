import { useForm, useWatch } from "react-hook-form";
import {
  defaultSalesSchema,
  salesSchema,
  SalesSchemaType,
} from "../../schemas/sales-schema";
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
import { PaymentSalesForm } from "./payment-form.sales";
import { isoToDatetimeLocal } from "@/utils/iso-to-date-time-local";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { SalesItemForm } from "./items-form.sales";
import { useFetch } from "@/hooks/use-fetch";
import { Product } from "@/features/products/type";
import { SERVER_URL } from "@/constants/url";
import { Textarea } from "@/components/ui/textarea";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { InfoItem } from "@/components/ui/info-item";

interface Props {
  setOpen: (state: boolean) => void;
  defaultValues?: SalesSchemaType;
  submitHandler: (values: SalesSchemaType) => void | Promise<void>;
}

export function FormSales({ setOpen, submitHandler, defaultValues }: Props) {
  const form = useForm<SalesSchemaType>({
    resolver: zodResolver(salesSchema),
    defaultValues: defaultValues ?? {
      ...defaultSalesSchema,
      transaction_at: new Date().toISOString(),
    },
  });

  const totalAmount = useWatch({
    control: form.control,
    name: "total_amount",
  });

  const isSubmitting = form.formState.isSubmitting;
  const isDirty = form.formState.isDirty;

  const fetcherProducts = useFetch<Product[]>(`${SERVER_URL}/products`);

  async function onSubmit(values: SalesSchemaType) {
    try {
      await submitHandler(values);
      setOpen(false);
      fetcherProducts.mutate();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan data");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, () =>
          toast.error("Data belum lengkap")
        )}
      >
        <ScrollArea className="h-96 px-4">
          <div className="grid md:grid-cols-2 gap-4 my-5">
            <FormField
              control={form.control}
              name="customer_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Pembeli</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Pembeli 1..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transaction_at"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaksi Penjualan</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      placeholder="Contoh: Pembeli 1..."
                      value={isoToDatetimeLocal(field.value)}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <PaymentSalesForm form={form} />
          <Separator className="my-5" />

          <SalesItemForm
            form={form}
            data={fetcherProducts.data}
            isLoading={fetcherProducts.isLoading}
          />
          <Separator className="my-5" />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catatan</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Catatan bila diperlukan..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </ScrollArea>
        <Separator className="my-4" />
        <div className="flex justify-between">
          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </Button>
            <Button
              type="button"
              disabled={!isDirty}
              variant={"outline"}
              onClick={() => {
                form.reset({
                  ...defaultSalesSchema,
                  transaction_at: new Date().toISOString(),
                });

                form.setFocus("customer_name");
              }}
            >
              Reset
            </Button>
          </div>
          <InfoItem label="Total Omzet" value={formatRupiah(totalAmount)} />
        </div>
      </form>
    </Form>
  );
}
