import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
}

export function FormFieldNumber<T extends FieldValues>({
  form,
  name,
  label,
  placeholder = "Isi field ini",
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
            <Input
              {...field}
              value={field.value}
              onChange={(e) => field.onChange(e.target.valueAsNumber)}
              onFocus={(e) => e.target.select()}
              type="number"
              disabled={isSubmitting}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
