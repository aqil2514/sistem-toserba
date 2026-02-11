export type CashDenominationType = "coin" | "bill";

export interface CashDenomination {
  id: string;
  nominal: number;
  label: string;
  type: CashDenominationType;
  is_active: boolean;
  created_at: string;
}
