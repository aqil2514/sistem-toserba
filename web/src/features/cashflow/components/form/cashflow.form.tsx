import { useForm } from "react-hook-form";
import {
  cashflowSchema,
  CashflowSchemaType,
  defaultCashflow,
} from "../../schema/cashflow.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CashflowProductServiceField } from "./fields/product-service.form-field";
import { CashflowTransactionAtField } from "./fields/transaction-at.form-field";
import { CashflowPriceField } from "./fields/price.form-field";
import { CashflowNoteServiceField } from "./fields/note.form-field";
import { CashflowViaField } from "./fields/via.form-field";
import { CasfhlowCategoryField } from "./fields/category.form-field";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Props {
  defaultValues?: CashflowSchemaType;
  submitHandler: (values: CashflowSchemaType) => void | Promise<void>;
}

export function CashflowForm({ submitHandler, defaultValues }: Props) {
  const form = useForm<CashflowSchemaType>({
    defaultValues: defaultValues ?? defaultCashflow,
    resolver: zodResolver(cashflowSchema),
    mode: "onChange",
  });

  const isSubmitting = form.formState.isSubmitting;

  return (
    <form
      onSubmit={form.handleSubmit(submitHandler, () =>
        toast.error("Ada data yang tidak lengkap"),
      )}
      className="space-y-4"
    >
      <Separator />
      <ScrollArea className="h-96 px-4 pb-4">
        <div className="space-y-4">

        <CashflowTransactionAtField form={form} />
        <div className="grid grid-cols-2 gap-4">
          <CashflowProductServiceField form={form} />
          <CashflowPriceField form={form} />
        </div>
        <CasfhlowCategoryField form={form} />
        <CashflowViaField form={form} />
        <CashflowNoteServiceField form={form} />
        </div>
      </ScrollArea>
      <Separator />
      <Button disabled={isSubmitting}>
        {isSubmitting ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
}
