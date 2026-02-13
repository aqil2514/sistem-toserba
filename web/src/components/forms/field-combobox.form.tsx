import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Combobox } from "../molecules/combobox/basic-combobox";
import { LabelValue } from "@/@types/general";

interface Props<T extends FieldValues, TOptions extends string> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  options: LabelValue<TOptions>[];
  getLabel?: (item: LabelValue<TOptions>) => React.ReactNode;
  onValueChange?: (value: string) => void;
}

export function FormFieldCombobox<
  T extends FieldValues,
  TOptions extends string,
>({
  form,
  name,
  label,
  placeholder,
  options,
  getLabel,
  onValueChange,
}: Props<T, TOptions>) {
  const isSubmitting = form.formState.isSubmitting;
  return (
    <FieldGroup>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>{label}</FieldLabel>
            <Combobox
              data={options}
              onValueChange={(e) => {
                field.onChange(e);
                onValueChange?.(e);
              }}
              value={field.value}
              disabled={isSubmitting}
              placeholder={placeholder}
              searchPlaceholder={placeholder}
              getLabel={getLabel}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
