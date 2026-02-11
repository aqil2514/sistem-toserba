import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
}

export function FormFieldDatePicker<T extends FieldValues>({
  form,
  label,
  name,
  placeholder,
}: Props<T>) {
  const [open, setOpen] = useState<boolean>(false);
  const isSubmitting = form.formState.isSubmitting;

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => {
          const date = field.value ? new Date(field.value) : undefined;

          return (
            <div>
              <div className="flex gap-4">
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>{label}</FieldLabel>

                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        disabled={isSubmitting}
                        variant="outline"
                        id="date-picker-optional"
                        className="w-32 justify-between font-normal"
                      >
                        {date ? format(date, "PPP") : placeholder}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(selectedDate) => {
                          if (!selectedDate) return;

                          const next = date ?? new Date();
                          next.setFullYear(
                            selectedDate.getFullYear(),
                            selectedDate.getMonth(),
                            selectedDate.getDate(),
                          );

                          field.onChange(next.toISOString());
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </Field>
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="time-picker-optional">Time</FieldLabel>
                  <Input
                    type="time"
                    id="time-picker-optional"
                    step="1"
                    value={date ? format(date, "HH:mm:ss") : ""}
                    disabled={isSubmitting}
                    onChange={(e) => {
                      const [h, m, s] = e.target.value.split(":").map(Number);
                      const next = date ? new Date(date) : new Date();

                      next.setHours(h || 0, m || 0, s || 0);
                      field.onChange(next.toISOString());
                    }}
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                </Field>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </div>
          );
        }}
      />
    </FieldGroup>
  );
}
