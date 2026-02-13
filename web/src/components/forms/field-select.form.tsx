import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { LabelValue } from "@/@types/general";

interface Props<T extends FieldValues, TOptions = unknown> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?:string;
  options: LabelValue<TOptions>[];
}

export function FormFieldSelect<T extends FieldValues, TOptions extends string>({
  form,
  name,
  label,
  placeholder="Isi field ini",
  options
}: Props<T, TOptions>) {
  const isSubmitting = form.formState.isSubmitting;
  return (
    <FieldGroup>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Select
              value={field.value}
              onValueChange={(value: TOptions) =>
                field.onChange(value)
              }
              disabled={isSubmitting}
              defaultValue={placeholder}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status Cashflow" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
