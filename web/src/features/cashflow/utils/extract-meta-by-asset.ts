import { CashflowDb, PayableCashflowMeta, ReceivableCashflowMeta } from "../types/cashflow.types";

export function extractMetaByAsset (row: CashflowDb) {
  if (!row.meta) return {};

  if (row.via === "Utang") {
    return {
      payable_vendor_name: (row.meta as PayableCashflowMeta).vendor_name,
    };
  }

  if (row.via === "Piutang") {
    return {
      receivable_customer_name: (row.meta as ReceivableCashflowMeta).customer_name,
    };
  }

  return {};
};