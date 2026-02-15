import { ActionLogsActivity, ActionLogsType } from "./per-feature/00.master-activity";

export interface ActivityLogsDb<T = unknown> {
  id: number;
  created_at: string;
  type: ActionLogsType;
  title: string;
  action: ActionLogsActivity;
  description: string;
  reference_id: string;
  meta?: T;
}

export type ActivityLogsInsert<T = unknown> = Omit<
  ActivityLogsDb<T>,
  'id' | 'created_at'
>;
