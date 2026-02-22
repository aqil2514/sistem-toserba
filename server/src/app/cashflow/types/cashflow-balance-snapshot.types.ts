export interface BalanceSnapshotDb {
  id: string;
  snapshot_date: string;
  asset: string | null;
  closing_balance: number;
  created_at: string | null;
}

export type BalanceSnapshotInsert = Omit<BalanceSnapshotDb, "id" | "created_at">