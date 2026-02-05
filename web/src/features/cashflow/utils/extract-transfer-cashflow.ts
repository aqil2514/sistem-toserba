import { transfer_fee_category_id } from "../constants/cashflow.constants";
import { CashflowDb } from "../types/cashflow.types";

export function extractTransferCashflow(raw: CashflowDb[]) {
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
  
  return { expense, income, fee };
}
