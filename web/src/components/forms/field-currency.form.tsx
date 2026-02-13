import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { CurrencyInputID } from "../ui/currency-input-id";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
}

export function FormFieldCurrency<T extends FieldValues>({
  form,
  name,
  label,
  placeholder = "Contoh : Rp. 10.000",
  disabled
}: Props<T>) {
  const isSubmitting = form.formState.isSubmitting;
  return (
    <FieldGroup>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <CurrencyInputID
              {...field}
              id={field.name}
              value={field.value}
              onValueChange={(val) => {
                if (!val) return;
                field.onChange(val);
              }}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              disabled={disabled || isSubmitting}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
