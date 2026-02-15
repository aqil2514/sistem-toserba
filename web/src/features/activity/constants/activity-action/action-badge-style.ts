import { ActivityLogsAction } from "../../types/per-feature/00.master-activity";

export const actionBadgeStyle: Record<ActivityLogsAction, string> = {
  ADD_CASH_COUNTER_CASH_COUNTING:
    "bg-green-50 text-green-700 border-green-200",

  ADD_SALES:
    "bg-green-50 text-green-700 border-green-200",

  DELETE_SALES:
    "bg-red-50 text-red-700 border-red-200",

  EDIT_SALES:
    "bg-amber-50 text-amber-700 border-amber-200",
};