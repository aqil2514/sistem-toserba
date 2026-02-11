import {
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Switch } from "../ui/switch";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
}

export function FormFieldSwitch<T extends FieldValues>({
  form,
  name,
  label,
}: Props<T>) {
  const isSubmitting = form.formState.isSubmitting;
  return (
    <FieldGroup>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="flex gap-2 items-center" data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Switch
              {...field}
              disabled={isSubmitting}
              id={field.name}
              checked={field.value}
              onCheckedChange={(e) => field.onChange(e)}
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </div>
        )}
      />
    </FieldGroup>
  );
}
