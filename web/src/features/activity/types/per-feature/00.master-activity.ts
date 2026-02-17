import { CashCounterActivityAction, CashCounterActivityType } from './cash-counter-activity';
import { PurchaseActivityAction, PurchaseActivityType } from './purchase-activity';
import { SalesActivityAction, SalesActivityType } from './sales-activity';

export type ActivityLogsAction =
  | CashCounterActivityAction
  | SalesActivityAction
  | PurchaseActivityAction;

export type ActivityLogsType = CashCounterActivityType | SalesActivityType | PurchaseActivityType;
