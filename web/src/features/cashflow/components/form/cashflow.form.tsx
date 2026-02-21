import { useForm, useWatch } from "react-hook-form";
import {
  cashflowSchema,
  CashflowSchemaType,
  defaultCashflow,
} from "../../schema/cashflow.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CashflowViaField } from "./fields/via.form-field";
import { CasfhlowCategoryField } from "./fields/category.form-field";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { DebtorFormField } from "./fields/debtor.form-field";
import { VendorFormField } from "./fields/payable-vendor.form-field";
import { FormFieldDatePicker } from "@/components/forms/field-date-picker.form";
import { FormFieldText } from "@/components/forms/field-text.form";
import { FormFieldCurrency } from "@/components/forms/field-currency.form";
import { FormFieldTextArea } from "@/components/forms/field-textarea.form";

export type OpenIdKeysTypes =
  | "debt-repayment"
  | "settlement-of-receivables"
  | "debt-update"
  | "settlement-update";

interface Props {
  defaultValues?: CashflowSchemaType;
  submitHandler: (values: CashflowSchemaType) => void | Promise<void>;
  openIdKey?: OpenIdKeysTypes;
}

export function CashflowForm({
  submitHandler,
  defaultValues,
  openIdKey,
}: Props) {
  const form = useForm<CashflowSchemaType>({
    defaultValues: defaultValues ?? defaultCashflow,
    resolver: zodResolver(cashflowSchema),
    mode: "onChange",
  });

  const isSubmitting = form.formState.isSubmitting;
  const cashflow = useWatch({
    control: form.control,
    name: "category.status",
  });

  const isSettlement = openIdKey === "settlement-of-receivables";
  const isRepayment = openIdKey === "debt-repayment";
  const isUpdateDebt = openIdKey === "debt-update"
  const isUpdateSettlement = openIdKey === "settlement-update"

  return (
    <form
      onSubmit={form.handleSubmit(submitHandler, (error) => {
        toast.error("Ada data yang tidak lengkap");
        console.error(error);
      })}
      className="space-y-4"
    >
      <Separator />
      <ScrollArea className="h-96 px-4 pb-4">
        <div className="space-y-4">
          <FormFieldDatePicker
            form={form}
            name="transaction_at"
            label="Pilih Tanggal"
            placeholder="Pilih Tanggal"
          />
          <div className="grid grid-cols-2 gap-4">
            <FormFieldText
              form={form}
              name="product_service"
              label="Nama Produk / Jasa"
              placeholder="Contoh : Omzet"
            />
            <FormFieldCurrency
              form={form}
              label="Harga"
              name="price"
              placeholder="Contoh : Rp. 10.000"
              withCalculator
            />
          </div>
          <CasfhlowCategoryField
            form={form}
            disabled={isSettlement || isRepayment || isUpdateSettlement || isUpdateDebt}
          />
          {cashflow === "receivable" && (
            <DebtorFormField disabled={isSettlement || isUpdateSettlement} form={form} />
          )}
          {cashflow === "payable" && <VendorFormField form={form} disabled={isRepayment || isUpdateDebt} />}
          <CashflowViaField form={form} openKeyId={openIdKey} />
          <FormFieldTextArea
            form={form}
            name="note"
            label="Catatan"
            placeholder="Contoh : Dapat harga diskon"
            disabled={isSettlement || isRepayment || isUpdateDebt || isUpdateSettlement}
          />
        </div>
      </ScrollArea>
      <Separator />
      <Button disabled={isSubmitting}>
        {isSubmitting ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
}
