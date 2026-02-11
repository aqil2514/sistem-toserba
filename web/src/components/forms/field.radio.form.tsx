import {
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { LabelValue } from "@/@types/general";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  title: string;
  options: LabelValue[];
}

export function FormFieldRadio<T extends FieldValues>({
  form,
  name,
  title,
  options,
}: Props<T>) {
  const isSubmitting = form.formState.isSubmitting;
  return (
    <FieldGroup>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="space-y-4">
            <FieldLabel>{title}</FieldLabel>
            <RadioGroup
              defaultValue="comfortable"
              className="flex flex-wrap ga-4"
              value={field.value}
              onValueChange={field.onChange}
              aria-invalid={fieldState.invalid}
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center gap-2">
                  <RadioGroupItem value={option.value} id={option.value} disabled={isSubmitting} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </div>
        )}
      />
    </FieldGroup>
  );
}
