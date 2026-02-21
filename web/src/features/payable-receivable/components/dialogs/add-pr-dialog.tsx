import { DialogWithForm } from "@/components/molecules/dialog/dialog-with-form";
import {
  CashflowForm,
  OpenIdKeysTypes,
} from "@/features/cashflow/components/form/cashflow.form";
import { useQueryParams } from "@/hooks/use-query-params";
import { buildAddPaymentSchema } from "../../utils/build-add-payment-schema";

export function PayableReceivableAddDialog() {
  const { get, update } = useQueryParams();
  const payment_type = get("add_payment_type");
  const counterpart_name = get("add_payment_name");

  const open = payment_type !== null && counterpart_name !== null;

  if (!open) return null;

  const isReceivable = payment_type === "receivable";

  const defaultValues = buildAddPaymentSchema({
    type: payment_type,
    customer_name: counterpart_name,
    vendor_name: counterpart_name,
  });

  const openIdKey: OpenIdKeysTypes = isReceivable
    ? "settlement-of-receivables"
    : "debt-repayment";

  return (
    <DialogWithForm
      FormComponent={
        <CashflowForm
          submitHandler={(values) => console.log(values)}
          defaultValues={defaultValues}
          openIdKey={openIdKey}
        />
      }
      description={`Tambah Pelunasan Pembayaran ${isReceivable ? "Piutang" : "Utang"} untuk ${counterpart_name}`}
      onOpenChange={(open) => {
        if (!open)
          return update({ add_payment_type: null, add_payment_name: null });
      }}
      open={open}
      title={`Tambah Pelunasan Untuk ${counterpart_name}`}
      size="xxl"
    />
  );
}
