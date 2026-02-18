import { LabelValue } from "@/@types/general";
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
  datalist?: LabelValue[];
}

export function FormFieldText<T extends FieldValues>({
  form,
  name,
  label,
  placeholder = "Isi field ini",
  datalist,
}: Props<T>) {
  const isSubmitting = form.formState.isSubmitting;
  return (
    <FieldGroup>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) =>{ 
          const datalistId = datalist ? `${field.name}-list` : undefined;
          return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Input
              {...field}
              disabled={isSubmitting}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              list={datalistId}
            />
            {datalist && (
              <datalist id={datalistId}>
                {datalist.map((data) => (
                  <option
                    value={data.value}
                    label={data.label}
                    key={data.value}
                  />
                ))}
              </datalist>
            )}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}}
      />
    </FieldGroup>
  );
}
