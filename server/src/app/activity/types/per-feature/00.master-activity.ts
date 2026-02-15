import {
  ActionLogsCashCounterActivity,
  ActionLogsCashCounterType,
} from './cash-counter-activity';
import { ActionLogsSalesActivity, ActionLogsSalesType } from './sales-activity';

export type ActionLogsActivity =
  | ActionLogsCashCounterActivity
  | ActionLogsSalesActivity;
export type ActionLogsType = ActionLogsCashCounterType | ActionLogsSalesType;
