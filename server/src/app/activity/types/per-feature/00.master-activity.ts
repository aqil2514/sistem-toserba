import { CashCounterActivityAction, CashCounterActivityType } from './cash-counter-activity';
import { CashflowActivityAction, CashflowActivityType } from './cashflow-activity';
import { SalesActivityAction, SalesActivityType } from './sales-activity';

export type ActivityLogsAction =
  | CashCounterActivityAction
  | SalesActivityAction
  | CashflowActivityAction;

export type ActivityLogsType = CashCounterActivityType | SalesActivityType | CashflowActivityType;
