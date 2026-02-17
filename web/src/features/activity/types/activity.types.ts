import {
  ActivityLogsType,
} from "./per-feature/00.master-activity";
import {
  PurchaseDetailMeta,
  PurchaseEditMeta,
} from "./per-feature/purchase-activity";
import {
  SalesLogMetaDetail,
  SalesLogMetaEdit,
} from "./per-feature/sales-activity";

export interface ActivityMetaMapping {
  ADD_CASH_COUNTER_CASH_COUNTING: unknown;

  ADD_SALES: SalesLogMetaDetail;
  DELETE_SALES: SalesLogMetaDetail;
  EDIT_SALES: SalesLogMetaEdit;

  ADD_PURCHASE: PurchaseDetailMeta;
  DELETE_PURCHASE: PurchaseDetailMeta;
  EDIT_PURCHASE: PurchaseEditMeta;
}

export interface ActivityLogsDb<T extends keyof ActivityMetaMapping> {
  id: number;
  created_at: string;
  type: ActivityLogsType;
  title: string;
  action: T;
  description: string;
  reference_id: string;
  meta?: ActivityMetaMapping[T];
}

export type ActivityLogsUnion = {
  [K in keyof ActivityMetaMapping]: {
    id: number;
    created_at: string;
    type: ActivityLogsType;
    title: string;
    action: K;
    description: string;
    reference_id: string;
    meta?: ActivityMetaMapping[K];
  };
}[keyof ActivityMetaMapping];
