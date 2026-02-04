import { CashflowSchemaType } from "../schema/cashflow.schema";
import { CashflowDb } from "../types/cashflow.types";

const transfer_fee_category_id = "d8d34dd6-4010-4e96-a081-288821917620";

// CashflowDb => expense & income || CashflowDb[] => Handle Transfer
export function mapDbToCashflowSchema(raw: CashflowDb[]): CashflowSchemaType {
  console.log(raw)
  const isTransfer = Boolean(raw[0].transfer_group_id);

  console.log(isTransfer)

  return isTransfer ? transferCashflow(raw) : nonTransferCashflow(raw[0]);
}

const normalizeIso = (date: string) => new Date(date).toISOString();

const nonTransferCashflow = (raw: CashflowDb): CashflowSchemaType => ({
  category: {
    description: raw.category.description,
    name: raw.category.name,
    status: raw.status_cashflow,
  },
  note: raw.note,
  price: raw.price,
  product_service: raw.product_service,
  transaction_at: normalizeIso(raw.transaction_at),

  via: raw.via,
});

const transferCashflow = (raw: CashflowDb[]): CashflowSchemaType => {
  const expense = raw.find((v) => v.status_cashflow === "expense");
  const income = raw.find((v) => v.status_cashflow === "income");
  const fee = raw.find(
    (v) =>
      v.status_cashflow === "expense" &&
      v.category.id === transfer_fee_category_id,
  );

  if (!expense || !income) {
    throw new Error("Invalid transfer cashflow data");
  }

  return {
    category: {
      name: expense.category.name,
      description: expense.category.description,
      status: "transfer",
    },
    note: expense.note,
    price: expense.price,
    product_service: expense.product_service,
    transaction_at: normalizeIso(expense.transaction_at),
    from_asset: expense.via,
    to_asset: income.via,
    transfer_fee: fee?.price,
    transfer_fee_asset: fee?.via,
  };
};
