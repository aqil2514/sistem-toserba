import { DialogWithForm } from "@/components/molecules/dialog/dialog-with-form";
import {
  CashflowForm,
  OpenIdKeysTypes,
} from "@/features/cashflow/components/form/cashflow.form";
import { useQueryParams } from "@/hooks/use-query-params";
import { buildAddPaymentSchema } from "../../utils/build-add-payment-schema";
import { CashflowSchemaType } from "@/features/cashflow/schema/cashflow.schema";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { useReceivablePayable } from "../../store/payable-receivable.provider";

export function PayableReceivableUpdateDialog() {
  const { mutate } = useReceivablePayable();
  const { get, update } = useQueryParams();
  const payment_type = get("update_payment_type");
  const counterpart_name = get("update_payment_name");

  const open = payment_type !== null && counterpart_name !== null;

  if (!open) return null;

  const addHandler = async (values: CashflowSchemaType) => {
    try {
      await api.post("/cashflow", values);
      update({
        update_payment_type: null,
        update_payment_name: null,
      });
      toast.success("Data berhasil ditambah");

      mutate?.();
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data.message?.[0] ?? "Terjadi kesalahan";

        toast.error(message);
      }
      console.error(error);
    }
  };

  const isReceivable = payment_type === "receivable";

  const defaultValues = buildAddPaymentSchema({
    type: payment_type,
    customer_name: counterpart_name,
    vendor_name: counterpart_name,
    isUpdate: true,
  });

  const openIdKey: OpenIdKeysTypes = isReceivable
    ? "settlement-update"
    : "debt-update";

    const receivablePayableNaration = `${isReceivable ? "Piutang" : "Utang"}`

  return (
    <DialogWithForm
      FormComponent={
        <CashflowForm
          submitHandler={addHandler}
          defaultValues={defaultValues}
          openIdKey={openIdKey}
        />
      }
      description={`Penambahan ${receivablePayableNaration} untuk ${counterpart_name}`}
      onOpenChange={(open) => {
        if (!open)
          return update({
            update_payment_type: null,
            update_payment_name: null,
          });
      }}
      open={open}
      title={`Penambahan ${receivablePayableNaration} Untuk ${counterpart_name}`}
      size="xxl"
    />
  );
}
