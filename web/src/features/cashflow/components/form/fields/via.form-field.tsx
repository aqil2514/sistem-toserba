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
import React, { useEffect, useMemo, useState } from "react";
import { Controller, UseFormReturn, useWatch } from "react-hook-form";
import { DebtorFormField } from "./debtor.form-field";
import { VendorFormField } from "./payable-vendor.form-field";
import { OpenIdKeysTypes } from "../cashflow.form";

interface Props {
  form: UseFormReturn<CashflowSchemaType>;
  openKeyId?: OpenIdKeysTypes;
}

export function CashflowViaField({ form, openKeyId }: Props) {
  const { data, isLoading } = useFetch<string[]>(
    `${SERVER_URL}/cashflow/assets`,
  );

  const viaData: string[] = useMemo(() => data ?? [], [data]);

  const [viaItems, setViaItems] = useState<string[]>([]);

  useEffect(() => {
    setViaItems(viaData);
  }, [viaData]);

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
    <TransferField
      form={form}
      items={viaItems}
      onItemsChange={setViaItems}
      openKeyId={openKeyId}
    />
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
  return (
    <FieldComboboxComp
      form={form}
      items={items}
      onItemsChange={onItemsChange}
      label="Via"
      name="via"
    />
  );
};

const TransferField: React.FC<TransferFieldProps> = ({
  form,
  items,
  onItemsChange,
  openKeyId,
}) => {
  const transfer_fee = useWatch({
    control: form.control,
    name: "transfer_fee",
  });

  const toAsset = useWatch({
    control: form.control,
    name: "to_asset",
  });

  const fromAsset = useWatch({
    control: form.control,
    name: "from_asset",
  });

  const isSubmitting = form.formState.isSubmitting;
  const isReceivable = toAsset === "Piutang" || fromAsset === "Piutang";
  const isPayable = fromAsset === "Utang" || toAsset === "Utang";

  const [isHaveFee, setIsHaveFee] = useState<boolean>(
    transfer_fee ? true : false,
  );

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
        <div className="grid grid-cols-2 gap-4">
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
          <FieldComboboxComp
            form={form}
            items={items}
            label="Biaya Dari Aset"
            name="transfer_fee_asset"
            onItemsChange={onItemsChange}
            openKeyId={openKeyId}
          />
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 ">
        <FieldComboboxComp
          form={form}
          items={items}
          label="Dari Aset"
          name="from_asset"
          onItemsChange={onItemsChange}
          openKeyId={openKeyId}
        />
        <FieldComboboxComp
          form={form}
          items={items}
          label="Ke Aset"
          name="to_asset"
          onItemsChange={onItemsChange}
          openKeyId={openKeyId}
        />
      </div>
      {isReceivable && <DebtorFormField form={form} disabled={openKeyId === "settlement-of-receivables"} />}
      {isPayable && <VendorFormField form={form} disabled={openKeyId === "debt-repayment"} />}
    </div>
  );
};

// HELPER COMPONENTS
interface FieldComboboxCompProps extends Props {
  name: "via" | "from_asset" | "to_asset" | "transfer_fee_asset";
  label: string;
  items: string[];
  onItemsChange: (state: string[]) => void;
}

const FieldComboboxComp: React.FC<FieldComboboxCompProps> = ({
  form,
  name,
  label,
  items,
  onItemsChange,
  openKeyId,
}) => {
  const isSubmitting = form.formState.isSubmitting;

  const isSettlement =
    name === "from_asset" && openKeyId === "settlement-of-receivables";
  const isRepayment = name === "to_asset" && openKeyId === "debt-repayment"

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldLabel htmlFor={name}>{label}</FieldLabel>
            </FieldContent>
            <ComboboxWithCreateAction
              items={items}
              onItemsChange={onItemsChange}
              onValueChange={field.onChange}
              value={field.value ?? ""}
              disabled={isSubmitting || isSettlement || isRepayment}
              valuePlaceholder="Cari atau Buat Aset Baru"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};
