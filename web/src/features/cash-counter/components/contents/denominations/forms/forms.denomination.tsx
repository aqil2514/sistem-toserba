import { useForm } from "react-hook-form";
import {
  defaultDenomination,
  denominationSchema,
  DenominationSchemaType,
} from "../../../../schemas/denominations.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FormFieldText } from "@/components/forms/field-text.form";
import { FormFieldCurrency } from "@/components/forms/field-currency.form";
import { FormFieldSwitch } from "@/components/forms/field.switch.form";
import { FormFieldRadio } from "@/components/forms/field.radio.form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { KeyedMutator } from "swr";
import { CashDenomination } from "../../../../types/types.cash-counter-denomination";
import { MutateButton } from "@/components/ui/mutate-button";

interface Props {
  onFormSubmit: (values: DenominationSchemaType) => void;
  defaultValues?: DenominationSchemaType;
  mutate?: KeyedMutator<CashDenomination>;
}

export function DenominationForms({ onFormSubmit, defaultValues, mutate }: Props) {
  const form = useForm<DenominationSchemaType>({
    resolver: zodResolver(denominationSchema),
    defaultValues: defaultValues ?? defaultDenomination,
  });

  const isSubmitting = form.formState.isSubmitting;
  return (
    <form
      onSubmit={form.handleSubmit(onFormSubmit, (error) => {
        toast.error("Ada data yang tidak lengkap");
        console.error(error);
      })}
      className="space-y-4"
    >
      <Separator />
      {mutate && <MutateButton mutate={mutate} onMutateSuccess={() => form.reset(defaultValues)} />}

      <div className="grid grid-cols-2 gap-4">
        <FormFieldText
          form={form}
          name="label"
          label="Label"
          placeholder="Misal : Rp. 1.000 (Koin)"
        />
        <FormFieldCurrency
          form={form}
          name="nominal"
          label="Nominal"
          placeholder="Misal: 5.000"
        />
        <FormFieldSwitch form={form} name="is_active" label="Aktif?" />
        <FormFieldRadio
          form={form}
          name="type"
          title="Tipe Uang"
          options={[
            { label: "Koin", value: "coin" },
            { label: "Kertas", value: "bill" },
          ]}
        />
      </div>
      <Separator />
      <Button disabled={isSubmitting} variant={"outline"} >
        {isSubmitting ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
}
