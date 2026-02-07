import { CashflowSchemaType } from "../schema/cashflow.schema";
import { CashflowDb } from "../types/cashflow.types";
import { extractMetaByAsset } from "./extract-meta-by-asset";
import { extractTransferCashflow } from "./extract-transfer-cashflow";

// CashflowDb => expense & income || CashflowDb[] => Handle Transfer
export function mapDbToCashflowSchema(raw: CashflowDb[]): CashflowSchemaType {
  const isTransfer = Boolean(raw[0].transfer_group_id);

  return isTransfer ? transferCashflow(raw) : nonTransferCashflow(raw[0]);
}

const normalizeIso = (date: string) => new Date(date).toISOString();

const nonTransferCashflow = (raw: CashflowDb): CashflowSchemaType => {
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

    ...extractMetaByAsset(raw),
  };
};

const transferCashflow = (raw: CashflowDb[]): CashflowSchemaType => {
  const { expense, fee, income } = extractTransferCashflow(raw);

  const metaFromExpense = extractMetaByAsset(expense);
  const metaFromIncome = extractMetaByAsset(income);

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

    ...metaFromExpense,
    ...metaFromIncome,
  };
};
