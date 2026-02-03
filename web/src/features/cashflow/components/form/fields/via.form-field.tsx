import { CurrencyInputID } from "@/components/ui/currency-input-id";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CashflowSchemaType } from "@/features/cashflow/schema/cashflow.schema";
import React, { useState } from "react";
import { Controller, UseFormReturn, useWatch } from "react-hook-form";

interface Props {
  form: UseFormReturn<CashflowSchemaType>;
}

export function CashflowViaField({ form }: Props) {
  const statusCashflow = useWatch({
    control: form.control,
    name: "category.status",
  });

  if (statusCashflow !== "transfer") return <NonTransferField form={form} />;

  return <TransferField form={form} />;
}

const NonTransferField: React.FC<Props> = ({ form }) => {
  const isSubmitting = form.formState.isSubmitting;

  return (
    <FieldGroup>
      <Controller
        name="via"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldLabel htmlFor="aset">Aset</FieldLabel>
            </FieldContent>
            <Select
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
              disabled={isSubmitting}
            >
              <SelectTrigger
                id="aset"
                aria-invalid={fieldState.invalid}
                className="w-full"
              >
                <SelectValue placeholder="Pilih Aset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Tunai</SelectItem>
                <SelectItem value="digital">Digital</SelectItem>
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};

const TransferField: React.FC<Props> = ({ form }) => {
  const isSubmitting = form.formState.isSubmitting;
  const [isHaveFee, setIsHaveFee] = useState<boolean>(false);

  return (
    <div className="p-4 rounded-2xl border border-gray-500 space-y-4">
      <div className="flex justify-between">
        <p className="text-muted-foreground text-sm font-semibold underline">
          Pindah Aset
        </p>
        <div className="flex gap-4 items-center">
          <Label htmlFor="switch-fee">

          <Switch id="switch-fee" checked={isHaveFee} onCheckedChange={setIsHaveFee} />
          <p className="text-muted-foreground text-sm font-semibold underline">
            {isHaveFee ? "Ada Biaya" : "Gratis"}
          </p>
          </Label>
        </div>
      </div>
      {isHaveFee && (
        <FieldGroup>
          <Controller
            name="transfer_fee"
            control={form.control}
            render={({ field, fieldState }) => {
              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Biaya Transfer</FieldLabel>
                  <CurrencyInputID
                    {...field}
                    id={field.name}
                    value={field.value}
                    onValueChange={(val) => {
                      if (!val) return;
                      field.onChange(val);
                    }}
                    aria-invalid={fieldState.invalid}
                    placeholder="Contoh : Rp. 10.000"
                    disabled={isSubmitting}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
        </FieldGroup>
      )}
      <div className="grid grid-cols-2 gap-4 ">
        <FieldGroup>
          <Controller
            name="from_asset"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor="aset">Dari Aset</FieldLabel>
                </FieldContent>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    id="aset"
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <SelectValue placeholder="Pilih Aset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Tunai</SelectItem>
                    <SelectItem value="digital">Digital</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            name="to_asset"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor="aset">Ke Aset</FieldLabel>
                </FieldContent>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    id="aset"
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <SelectValue placeholder="Pilih Aset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Tunai</SelectItem>
                    <SelectItem value="digital">Digital</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>
    </div>
  );
};
