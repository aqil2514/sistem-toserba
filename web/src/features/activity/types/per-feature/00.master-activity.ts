import { CashCounterActivityAction, CashCounterActivityType } from './cash-counter-activity';
import { SalesActivityAction, SalesActivityType } from './sales-activity';

export type ActivityLogsAction =
  | CashCounterActivityAction
  | SalesActivityAction;

export type ActivityLogsType = CashCounterActivityType | SalesActivityType;
