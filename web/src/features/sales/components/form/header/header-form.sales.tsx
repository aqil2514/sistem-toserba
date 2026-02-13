import { FormFieldDatePicker } from "@/components/forms/field-date-picker.form";
import { FormFieldSelect } from "@/components/forms/field-select.form";
import { FormFieldText } from "@/components/forms/field-text.form";
import { FormFieldTextArea } from "@/components/forms/field-textarea.form";
import { Separator } from "@/components/ui/separator";
import { SalesSchemaType } from "@/features/sales/schemas/sales-schema";
import { UseFormReturn } from "react-hook-form";

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

interface Props {
  form: UseFormReturn<SalesSchemaType>;
}

export function SalesHeaderForm({ form }: Props) {
  return (
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
  );
}
