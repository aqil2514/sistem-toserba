import { CashflowSchemaType } from "../schema/cashflow.schema";
import { CashflowDb, ReceivableCashflowMeta } from "../types/cashflow.types";
import { extractTransferCashflow } from "./extract-transfer-cashflow";

// CashflowDb => expense & income || CashflowDb[] => Handle Transfer
export function mapDbToCashflowSchema(raw: CashflowDb[]): CashflowSchemaType {
  const isTransfer = Boolean(raw[0].transfer_group_id);

  return isTransfer ? transferCashflow(raw) : nonTransferCashflow(raw[0]);
}

const normalizeIso = (date: string) => new Date(date).toISOString();

const nonTransferCashflow = (raw: CashflowDb): CashflowSchemaType => {
  const isReceivable = raw.status_cashflow === "receivable";
  return {
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

    receivable_customer_name: isReceivable
      ? (raw.meta as ReceivableCashflowMeta).customer_name
      : undefined,
  };
};

const transferCashflow = (raw: CashflowDb[]): CashflowSchemaType => {
  const { expense, fee, income } = extractTransferCashflow(raw);

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
