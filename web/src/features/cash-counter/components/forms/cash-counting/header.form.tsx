import { FormFieldCurrency } from "@/components/forms/field-currency.form";
import { FormFieldDatePicker } from "@/components/forms/field-date-picker.form";
import { FormFieldText } from "@/components/forms/field-text.form";
import { FormFieldTextArea } from "@/components/forms/field-textarea.form";
import { FormFieldSwitch } from "@/components/forms/field.switch.form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CashCountSchemaType,
  defaultThirdPartySchema,
} from "@/features/cash-counter/schemas/cash-counts.schema";
import { Plus, Trash } from "lucide-react";
import { useFieldArray, UseFormReturn, useWatch } from "react-hook-form";

interface Props {
  form: UseFormReturn<CashCountSchemaType>;
}

export function HeaderForm({ form }: Props) {
  const isHaveThirdParty = useWatch({
    control: form.control,
    name: "isHaveThirdParty",
  });

  return (
    <div className="space-y-4">
      <FormFieldDatePicker
        form={form}
        label="Tanggal Hitung"
        name="date"
        placeholder="Pilih tanggal hitung"
      />

      <div className="flex justify-end">
        <FormFieldSwitch
          form={form}
          name="isHaveThirdParty"
          label={
            isHaveThirdParty
              ? "Ada uang orang lain"
              : "Tidak ada uang orang lain"
          }
          position="text-in-right"
        />
      </div>

      {isHaveThirdParty && <ThirdPartyForm form={form} />}

      <FormFieldTextArea form={form} name="notes" label="Catatan" />
    </div>
  );
}

const ThirdPartyForm: React.FC<{
  form: UseFormReturn<CashCountSchemaType>;
}> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "thirdParty",
  });
  return (
    <div className="space-y-4 p-4 border rounded-2xl">
      <p className="font-semibold text-sm underline">Uang Orang Ketiga</p>
      <div className="grid grid-cols-2 gap-4">
        {fields.length === 0 ? (
          <p>Silahkan tambah data</p>
        ) : (
          fields.map((field, i) => {
            return (
              <div key={field.id} className="space-y-4">
                <Button
                  variant={"destructive"}
                  size={"icon-sm"}
                  onClick={() => remove(i)}
                >
                  <Trash />
                </Button>
                <div className="grid grid-cols-2 gap-4">
                  <FormFieldText
                    form={form}
                    label={`Nama Pihak ke-${i + 1}`}
                    name={`thirdParty.${i}.source`}
                    placeholder="Misal : Uang Doi"
                  />
                  <FormFieldCurrency
                    form={form}
                    label={`Jumlah Dana Pihak ke-${i + 1}`}
                    name={`thirdParty.${i}.amount`}
                    placeholder="Misal : Rp. 10.000"
                    withCalculator
                  />
                </div>
                <FormFieldTextArea
                  form={form}
                  name={`thirdParty.${i}.note`}
                  label="Catatan"
                  placeholder="Misal: Kembaliannya kurang"
                />
              </div>
            );
          })
        )}
      </div>

      <Separator />
      <div className="flex justify-between">
        <p>Total</p>
        <div>
          <Button
            type="button"
            variant={"outline"}
            size={"icon-sm"}
            onClick={() => append(defaultThirdPartySchema)}
          >
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
};
