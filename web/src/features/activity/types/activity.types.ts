import {
  ActivityLogsAction,
  ActivityLogsType,
} from './per-feature/00.master-activity';

export interface ActivityLogsDb<T = unknown> {
  id: number;
  created_at: string;
  type: ActivityLogsType;
  title: string;
  action: ActivityLogsAction;
  description: string;
  reference_id: string;
  meta?: T;
}