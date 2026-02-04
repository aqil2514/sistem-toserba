import { ComboboxWithCreateAction } from "@/components/molecules/combobox/create-new-combobox";
import { CurrencyInputID } from "@/components/ui/currency-input-id";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SERVER_URL } from "@/constants/url";
import { CashflowSchemaType } from "@/features/cashflow/schema/cashflow.schema";
import { useFetch } from "@/hooks/use-fetch";
import React, { useMemo, useState } from "react";
import { Controller, UseFormReturn, useWatch } from "react-hook-form";

interface Props {
  form: UseFormReturn<CashflowSchemaType>;
}

export function CashflowViaField({ form }: Props) {
  const { data, isLoading } = useFetch<string[]>(
    `${SERVER_URL}/cashflow/assets`,
  );

  const viaData: string[] = useMemo(() => data ?? [], [data]);

  const [viaItems, setViaItems] = useState<string[]>(viaData);

  const statusCashflow = useWatch({
    control: form.control,
    name: "category.status",
  });

  if (isLoading) return null;

  if (statusCashflow !== "transfer")
    return (
      <NonTransferField
        form={form}
        items={viaItems}
        onItemsChange={setViaItems}
      />
    );

  return (
    <TransferField form={form} items={viaItems} onItemsChange={setViaItems} />
  );
}

type TransferFieldProps = Props & {
  items: string[];
  onItemsChange: (state: string[]) => void;
};
const NonTransferField: React.FC<TransferFieldProps> = ({
  form,
  items,
  onItemsChange,
}) => {
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
            <ComboboxWithCreateAction
              items={items}
              onItemsChange={onItemsChange}
              onValueChange={field.onChange}
              value={field.value ?? ""}
              disabled={isSubmitting}
              valuePlaceholder="Cari atau Buat Aset Baru"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};

const TransferField: React.FC<TransferFieldProps> = ({
  form,
  items,
  onItemsChange,
}) => {
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
            <Switch
              id="switch-fee"
              checked={isHaveFee}
              onCheckedChange={setIsHaveFee}
            />
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
                <ComboboxWithCreateAction
                  items={items}
                  onItemsChange={onItemsChange}
                  onValueChange={field.onChange}
                  value={field.value ?? ""}
                  disabled={isSubmitting}
                  valuePlaceholder="Cari atau Buat Aset Baru"
                />
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
                <ComboboxWithCreateAction
                  items={items}
                  onItemsChange={onItemsChange}
                  onValueChange={field.onChange}
                  value={field.value ?? ""}
                  disabled={isSubmitting}
                  valuePlaceholder="Cari atau Buat Aset Baru"
                />
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
