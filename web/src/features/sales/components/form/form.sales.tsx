import { useForm, useWatch } from "react-hook-form";
import {
  defaultSalesSchema,
  salesSchema,
  SalesSchemaType,
} from "../../schemas/sales-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { SalesItemForm } from "./items/items-form.sales";
import { useFetch } from "@/hooks/use-fetch";
import {
  Product,
  ProductStockRpcResponse,
} from "@/features/products/types/type";
import { SERVER_URL } from "@/constants/url";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { InfoItem } from "@/components/molecules/items/info-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormFieldText } from "@/components/forms/field-text.form";
import { FormFieldDatePicker } from "@/components/forms/field-date-picker.form";
import { FormFieldSelect } from "@/components/forms/field-select.form";
import { FormFieldTextArea } from "@/components/forms/field-textarea.form";

interface Props {
  setOpen: (state: boolean) => void;
  defaultValues?: SalesSchemaType;
  submitHandler: (values: SalesSchemaType) => void | Promise<void>;
}

const paymentMethodOptions = [
  {
    value: "cash",
    label: "Kas (Lunas)",
  },
  {
    value: "utang",
    label: "Utang",
  },
  {
    value: "digital",
    label: "Digital",
  },
];

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

  const fetcherProducts = useFetch<Product[]>(
    `${SERVER_URL}/products?display-mode=non_deleted_item`,
  );
  const fetcherPurchase = useFetch<ProductStockRpcResponse>(
    `${SERVER_URL}/products/stocks`,
  );

  async function onSubmit(values: SalesSchemaType) {
    try {
      await submitHandler(values);
      setOpen(false);
      fetcherProducts.mutate();
      fetcherPurchase.mutate();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan data");
    }
  }

  const isLoading = fetcherProducts.isLoading || fetcherPurchase.isLoading;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, () =>
          toast.error("Data belum lengkap"),
        )}
      >
        <ScrollArea className="h-96">
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Sales Header */}
            <div className="space-y-4">
              <FormFieldText
                form={form}
                label="Nama Pembeli"
                name="customer_name"
                placeholder="Contoh : Pembeli 1..."
              />

              <FormFieldDatePicker
                form={form}
                label="Tanggal Transaksi"
                name="transaction_at"
                placeholder="Pilih Tanggal"
              />

              <FormFieldSelect
                form={form}
                label="Metode Pembayaran"
                name="payment_method"
                placeholder="Metode Pembayaran"
                options={paymentMethodOptions}
              />

              <Separator className="my-5" />

              <FormFieldTextArea
                form={form}
                label="Catatan"
                name="notes"
                placeholder="Misal : Dijaga orang lain..."
              />
            </div>

            <SalesItemForm
              form={form}
              data={fetcherProducts.data}
              isLoading={isLoading}
              stocks={fetcherPurchase.data?.data}
            />
          </div>
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
