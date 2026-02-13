import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useState } from "react";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { ComboboxWithCreateAction } from "../molecules/combobox/create-new-combobox";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  options: string[];
}

export function FormFieldComboboxAction<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  options,
}: Props<T>) {
  const [items, setItems] = useState<string[]>(options);

  const isSubmitting = form.formState.isSubmitting;
  return (
    <FieldGroup>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>{label}</FieldLabel>
            <ComboboxWithCreateAction
              items={items}
              placeholder={placeholder}
              valuePlaceholder={placeholder}
              onValueChange={field.onChange}
              onItemsChange={setItems}
              disabled={isSubmitting}
              value={field.value}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
