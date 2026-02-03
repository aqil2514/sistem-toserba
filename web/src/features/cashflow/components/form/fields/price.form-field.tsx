import { CurrencyInputID } from "@/components/ui/currency-input-id";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { CashflowSchemaType } from "@/features/cashflow/schema/cashflow.schema";
import { Controller, UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<CashflowSchemaType>;
}
export function CashflowPriceField({ form }: Props) {
  const isSubmitting = form.formState.isSubmitting;
  return (
    <FieldGroup>
      <Controller name="price" control={form.control} render={({field, fieldState}) => {
        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Harga</FieldLabel>
            <CurrencyInputID
              {...field}
              id={field.name}
              value={field.value}
              onValueChange={(val) => {
                if(!val) return;
                field.onChange(val)
              } }
              aria-invalid={fieldState.invalid}
              placeholder="Contoh : Rp. 10.000"
              disabled={isSubmitting}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )
      }} />
    </FieldGroup>
  );
}
