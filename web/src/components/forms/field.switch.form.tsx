import { FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
import { Switch } from "../ui/switch";
import React from "react";

type Position = "text-in-left" | "text-in-right";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  position?: Position;
}

export function FormFieldSwitch<T extends FieldValues>({
  form,
  name,
  label,
  position = "text-in-left",
}: Props<T>) {
  const isSubmitting = form.formState.isSubmitting;
  return (
    <FieldGroup>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => (
          <div
            className="flex gap-2 items-center"
            data-invalid={fieldState.invalid}
          >
            <FlexRender
              field={field}
              fieldState={fieldState}
              isSubmitting={isSubmitting}
              label={label}
              position={position}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </div>
        )}
      />
    </FieldGroup>
  );
}

interface FlexRenderProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  fieldState: ControllerFieldState;
  label: string;
  isSubmitting: boolean;
  position: Position;
}
function FlexRender<T extends FieldValues>({
  field,
  fieldState,
  isSubmitting,
  label,
  position,
}: FlexRenderProps<T>) {
  if (position === "text-in-right")
    return (
      <>
        <Switch
          {...field}
          id={field.name}
          disabled={isSubmitting}
          checked={field.value}
          onCheckedChange={field.onChange}
          aria-invalid={fieldState.invalid}
        />
        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      </>
    );

  return (
    <>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

      <Switch
        {...field}
        id={field.name}
        disabled={isSubmitting}
        checked={field.value}
        onCheckedChange={field.onChange}
        aria-invalid={fieldState.invalid}
      />
    </>
  );
}
